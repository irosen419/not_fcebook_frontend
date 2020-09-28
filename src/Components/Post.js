import React from 'react'
import '../Css/Post.css'
import PostContent from './PostContent'
import CommentContainer from '../Containers/CommentContainer'
import Like from './Like'

export default class Post extends React.Component {

    state = {
        post: this.props.post,
        likes: this.props.post.post_likes.length > 0 ? this.props.post.post_likes : []
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
            // body: {NO BODY}
        }
        fetch(`http://localhost:3000/api/v1/posts/${foundPostLike.post_id}/unlike/${foundPostLike.id}`, configObj)
            .then(resp => resp.json())
            .then(post => this.setState(() => ({
                post: post.post,
                likes: post.post.post_likes
            })))
        // Returns the post Obj with all associated likes and comments (not with the delete post_like)
    }

    // editPostForm = () => {
    //     return 
    // }

    render() {
        return (
            <div className="post">
                <PostContent post={this.props.post} />
                <div className="post-wrapper" >
                    <Like 
                        user={this.props.user} 
                        post={this.props.post} 
                        likes={this.state.likes} 
                        postAddLike={this.postAddLike} 
                        postRemoveLike={this.postRemoveLike} 
                    />
                    {this.state.post.user_id === this.props.user.id ? 
                    <div >
                        <button onClick={() => this.props.editPost(this.state.post)} >Edit Post</button>
                        <button onClick={() => this.props.deletePost(this.state.post)} >Delete Post</button>
                    </div>
                    : null }
                </div>
                <CommentContainer 
                    user={this.props.user} 
                    post={this.props.post} 
                />
            </div>
        )
    }
}