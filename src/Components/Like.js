import React from 'react'
import '../Css/Like.css'


export default class Like extends React.Component {

    likeHandler = () => {
        this.props.liked ? this.removeLike() : this.addLike()
    }

    addLike = () => {
        if (this.props.postAddLike) {
            this.props.postAddLike({ post_id: this.props.post.id, user_id: this.props.userId })
        } else if (this.props.commentAddLike) {
            this.props.commentAddLike({ user_id: this.props.comment.user_id, comment_id: this.props.comment.id })
        }
    }

    removeLike = () => {
        if (this.props.postRemoveLike) {
            this.props.postRemoveLike({ post_id: this.props.post.id, user_id: this.props.userId })
        } else if (this.props.commentRemoveLike) {
            this.props.commentRemoveLike({ user_id: this.props.comment.user_id, comment_id: this.props.comment.id })
        }
    }

    render() {
        return (
            <div className="like-component">
                <button onClick={this.likeHandler}>{this.props.liked ? 'Unlike' : 'Like'}</button>
                <span>{this.props.likeNum} likes</span>
            </div>
        )
    }
}