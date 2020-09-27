import React from 'react'
// import { createPortal } from 'react-dom'
// import '../Css/CommentContainer.css'
// import { Route, NavBar } from 'react-router-dom'
import Comment from '../Components/Comment'
import CommentForm from '../Components/CommentForm'

export default class PostContainer extends React.Component {

    state = {
        comments: this.props.post.comments ? this.props.post.comments : []
    }

    componentDidMount() {
        this.renderComments()
    }
    renderComments = () => {
        let comments = this.state.comments
        return comments.map(comment => <Comment key={comment.id} user={this.props.post.user_name} token={this.props.token} comment={comment} />)
    }

    commentSubmitHandler = (comment) => {
        this.commentPostFetch(comment)
    }

    commentPostFetch = (commentObj) => {
        const newComment = {
            content: commentObj.content,
            user_id: this.props.userId,
            post_id: this.props.post.id
        }
        const configObj = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.props.token}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({ comment: newComment })
        }
        fetch(`http://localhost:3000/api/v1/posts/${newComment.post_id}/comments/`, configObj)
            .then(resp => resp.json())
            .then(post => this.setState(() => ({ comments: post.post.comments })))
        // Returns single post with associated likes, and new comments.
    }
    //this.setState(() => ({ comments: comment.post.comments }))
    render() {
        console.log("Post: ", this.props.post)
        return (
            <div className="comment-container" >
                { this.renderComments()}
                < CommentForm commentSubmitHandler={this.commentSubmitHandler} />
            </div>
        )
    }
}