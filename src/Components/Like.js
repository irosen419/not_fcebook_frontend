import React from 'react'
import '../Css/Like.css'


export default class Like extends React.Component {

    renderButton = () => {
        if (this.props.likes.length > 0) {
            const userIdArray = this.props.likes.map(like => like.user_id)
            if (userIdArray.includes(this.props.user.id)) {
                return false
            } else {
                return true
            }
        } else {
            return true
        }
    }

    likeHandler = () => {
        this.renderButton() ? this.addLike() : this.removeLike()
    }

    addLike = () => {
        if (this.props.postAddLike) {
            this.props.postAddLike({ user_id: this.props.user.id , post_id: this.props.post.id })
        } else if (this.props.commentAddLike) {
            this.props.commentAddLike({ user_id: this.props.user.id, comment_id: this.props.comment.id })
        }
    }
    removeLike = () => {
        if (this.props.postRemoveLike) {
            this.props.postRemoveLike({ user_id: this.props.user.id, post_id: this.props.post.id })
        } else if (this.props.commentRemoveLike) {
            this.props.commentRemoveLike({ user_id: this.props.user.id, comment_id: this.props.comment.id })
        }
    }

    render() {
        return (
            <div className="like-component">
                <button onClick={this.likeHandler}>{this.renderButton() ? 'Like' : 'Unlike'}</button>
                <span>{this.props.likes.length} likes</span>
            </div>
        )
    }
}