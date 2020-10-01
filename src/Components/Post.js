import React from 'react'
import '../Css/Post.css'
import PostContent from './PostContent'
import CommentContainer from '../Containers/CommentContainer'
import Like from './Like'

export default class Post extends React.Component {

    state = {
        post: this.props.post,
        likes: this.props.post.post_likes ? this.props.post.post_likes : [],
        clicked: false,
        editor: false
    }

    postAddLike = (newLikeObj) => {
        const configObj = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({ post_like: newLikeObj })
        }
        fetch(`http://localhost:3000/api/v1/posts/${newLikeObj.post_id}/like`, configObj)
            .then(resp => resp.json())
            .then(post => this.setState(() => ({
                post: post.post,
                likes: post.post.post_likes
            })))
        // Returns the post Obj with all associated likes and comments
    }

    postRemoveLike = (likeObj) => {
        console.log(this.state)
        const foundPostLike = this.state.likes.find(like => like.user_id === likeObj.user_id)
        const configObj = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        }
        fetch(`http://localhost:3000/api/v1/posts/${foundPostLike.post_id}/unlike/${foundPostLike.id}`, configObj)
            .then(resp => resp.json())
            .then(post => this.setState(() => ({
                post: post.post,
                likes: post.post.post_likes
            })))
        // Returns the post Obj with all associated likes and comments (not with the delete post_like)
    }

    edit = () => {
        this.props.edit(this.props.post)
        this.setState(() => ({
            clicked: true
        }))
    }
    editSubmit = () => {
        this.props.submitHandler()
        this.setState(() => ({
            clicked: false
        }))
    }

    showEditButtons = () => {
        return (
            <div className="buttons post-buttons">
                <span onClick={this.toggleEditor}>x</span>
                <button className="post-edit edit" onClick={this.edit} >Edit</button>
                <button className="post-delete delete" onClick={() => this.props.deletePost(this.state.post)} >Delete</button>
            </div>
        )
    }

    showEditMenu = () => {
        return (this.state.editor ?
            this.showEditButtons() :
            <img className="menu" alt="Alt" src={require("../Components/menu-icon.png")} onClick={this.toggleEditor} />)
    }

    decideEditMenu = () => {
        return this.state.post.user_id === this.props.user.id ? this.showEditMenu() : null
    }

    toggleEditor = () => {
        this.setState((previousState) => ({ editor: !previousState.editor }))
    }

    render() {
        return (
            <div className="post">
                <div className="right extra">
                    {this.decideEditMenu()}
                </div>
                <PostContent
                    post={this.props.post}
                    clicked={this.state.clicked}
                    changeHandler={this.props.changeHandler}
                    submitHandler={this.editSubmit}
                    editContent={this.props.editContent}
                    showOrHideModal={this.props.showOrHideModal}
                />
                <div className="post-wrapper" >
                    <Like
                        user={this.props.user}
                        post={this.props.post}
                        likes={this.state.likes}
                        postAddLike={this.postAddLike}
                        postRemoveLike={this.postRemoveLike}
                    />
                </div>
                <CommentContainer
                    user={this.props.user}
                    post={this.props.post}
                />
            </div>
        )
    }
}