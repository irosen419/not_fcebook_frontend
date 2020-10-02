import React from 'react'
import '../Css/Comment.css'
import Like from './Like'
import img from "../Components/blank-profile-pic.png"

export default class Comment extends React.Component {

    state = {
        comment: this.props.comment,
        likes: this.props.comment.comment_likes.length > 0 ? this.props.comment.comment_likes : [],
        editor: false
    }

    commentAddLike = (commentObj) => {
        const configObj = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({ comment_like: commentObj })
        }
        fetch(`http://localhost:3000/api/v1/posts/${this.state.comment.post_id}/comments/${this.state.comment.id}/like`, configObj)
            .then(resp => resp.json())
            .then(comment => {
                this.setState(() => ({
                    comment: comment.comment,
                    likes: comment.comment.comment_likes
                }))
            })
        // Returns the comment that was liked, with all comment_likes associated with it.
    }

    commentRemoveLike = (likeObj) => {
        const foundCommentLike = this.state.likes.find(like => like.user_id === likeObj.user_id)
        const configObj = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
            // body: JSON.stringify({comment_like: newCommentLike})
        }
        fetch(`http://localhost:3000/api/v1/posts/${this.state.comment.post_id}/comments/${this.state.comment.id}/unlike/${foundCommentLike.id}`, configObj)
            .then(resp => resp.json())
            .then(comment => this.setState(() => ({
                comment: comment.comment,
                likes: comment.comment.comment_likes
            })))
        // Returns the comment that was liked, with all comment_likes associated with it (minus the deleted one).
    }

    showEditButtons = () => {
        return (
            <div className="buttons post-buttons">
                <span className="close" onClick={this.toggleEditor}>x</span>
                {this.props.comment.user_id === this.props.user.id ? <button className="comment-edit edit" onClick={() => this.props.editComment(this.state.comment)} >Edit</button> : null}
                <button className="comment-delete delete" onClick={() => this.props.deleteComment(this.state.comment)}  >Delete</button>
            </div>
        )
    }

    showEditMenu = () => {
        return (this.state.editor ?
            this.showEditButtons() :
            <img className="menu" alt="Alt" src={require("../Components/menu-icon.png")} onClick={this.toggleEditor} />)
    }

    decideEditMenu = () => {
        return (this.props.post.user_id === this.props.user.id || this.props.comment.user_id === this.props.user.id) ? this.showEditMenu() : null
    }

    toggleEditor = () => {
        this.setState((previousState) => ({ editor: !previousState.editor }))
    }

    render() {

        return (
            <div className="comment" >
                <div className="comment-words">
                    this.props.comment.user_url ?
                        <a href={`/profile/${this.props.comment.user_id}`}><img id="post" alt="" src={this.props.comment.user_url} /></a> :
                        <a href={`/profile/${this.props.comment.user_id}`}><img id="post" alt="Alt" src={img} /></a>
                    }
                    <a href={`/profile/${this.props.comment.user_id}`}><strong><p className="comment-username">{this.props.comment.user_name}:</p></strong></a>
                    <p className="comment-content">{this.props.comment.content}</p>
                </div>
                <div className="right">
                    <Like
                        likes={this.state.likes}
                        user={this.props.user}
                        comment={this.state.comment}
                        commentAddLike={this.commentAddLike}
                        commentRemoveLike={this.commentRemoveLike}
                    />
                    <div className="right extra">
                        {this.decideEditMenu()}
                    </div>

                </div>
            </div >
        )
    }
}