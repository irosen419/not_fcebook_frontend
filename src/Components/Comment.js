import React from 'react'
import '../Css/Comment.css'
import Like from './Like'

export default class Comment extends React.Component {

    state = {
        comment: this.props.comment,
        liked: false
    }

    commentAddLike = (like) => {
        this.commentLikeFetch(like)
    }

    commentLikeFetch = (commentObj) => {
        const configObj = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({ comment_like: commentObj })
        }
        fetch(`http://localhost:3000/api/v1/posts/${commentObj.post_id}/comments/${commentObj.id}/like`, configObj)
            .then(resp => resp.json())
            .then(comment => this.setState(() => ({
                comment: comment.comment,
                liked: true
            })))
        // Returns the comment that was liked, with all comment_likes associated with it.
    }

    commentRemoveLike = (like) => {
        this.commentUnlikeFetch(this.props.comment, like)
    }

    commentUnlikeFetch = (commentObj, likeObj) => {
        const foundCommentLike = commentObj.comment_likes.find(like => like.user_id === likeObj.user_id)
        const configObj = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
            // body: JSON.stringify({comment_like: newCommentLike})
        }
        fetch(`http://localhost:3000/api/v1/posts/${commentObj.post_id}/comments/${commentObj.id}/unlike/${foundCommentLike.id}`, configObj)
            .then(resp => resp.json())
            .then(comment => this.setState(() => ({
                comment: comment.comment,
                liked: false
            })))
        // Returns the comment that was liked, with all comment_likes associated with it (minus the deleted one).
    }

    render() {
        console.log("Props: ", this.props)
        return (
            <div className="comment" >
                <strong><p>{this.props.comment.user_name}:</p></strong>
                <p>{this.props.comment.content}</p>
                <Like liked={this.state.liked} likeNum={this.state.comment.comment_likes.length} comment={this.state.comment} commentAddLike={this.commentAddLike} commentRemoveLike={this.commentRemoveLike} />
            </div>
        )
    }
}