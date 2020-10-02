import React from 'react'
// import { createPortal } from 'react-dom'
// import '../Css/CommentContainer.css'
// import { Route, NavBar } from 'react-router-dom'
import Comment from '../Components/Comment'
import CommentForm from '../Components/CommentForm'

export default class PostContainer extends React.Component {

    state = {
        comments: this.props.post.comments ? this.props.post.comments : [],
        content: "",
        commentEditObj: ""
    }

    renderComments = () => {
        return this.state.comments.map(comment =>
            <Comment
                comment={comment}
                key={comment.id}
                user={this.props.user}
                editComment={this.editComment}
                deleteComment={this.deleteComment}
                post={this.props.post}
            />
        )
    }

    changeHandler = (e) => {
        e.persist()
        this.setState(() => ({
            content: e.target.value
        }))
    }

    editComment = (commentObj) => {
        this.setState(() => ({
            content: commentObj.content,
            commentEditObj: commentObj
        }))
    }

    deleteComment = (commentObj) => {
        const configObj = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            // body: JSON.stringify({comment: updateComment})
        }
        fetch(`http://localhost:3000/api/v1/posts/${commentObj.post_id}/comments/${commentObj.id}`, configObj)
            .then(resp => resp.json())
            .then(post => {
                this.setState(() => ({
                    comments: post.post.comments,
                    content: ""
                }))
            })
    }

    submitHandler = () => {
        if (this.state.commentEditObj.id) {
            // -- EDIT COMMENT FETCH -- //
            const updateComment = { content: this.state.content }
            const configObj = {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                },
                body: JSON.stringify({ comment: updateComment })
            }
            fetch(`http://localhost:3000/api/v1/posts/${this.state.commentEditObj.post_id}/comments/${this.state.commentEditObj.id}`, configObj)
                .then(resp => resp.json())
                .then(post => {
                    this.setState(() => ({
                        comments: post.post.comments,
                        content: "",
                        commentEditObj: ""
                    }))
                })
        } else {
            // --  NEW COMMENT FETCH -- //
            const newComment = {
                content: this.state.content,
                user_id: this.props.user.id,
                post_id: this.props.post.id
            }
            const configObj = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                },
                body: JSON.stringify({ comment: newComment })
            }
            fetch(`http://localhost:3000/api/v1/posts/${newComment.post_id}/comments/`, configObj)
                .then(resp => resp.json())
                .then(post => {
                    this.setState(() => ({
                        comments: post.post.comments,
                        content: ""
                    }))
                })
        }
    }

    render() {

        return (
            <div className="comment-container" >

                {this.renderComments()}

                < CommentForm
                    content={this.state.content}
                    changeHandler={this.changeHandler}
                    submitHandler={this.submitHandler}
                />
            </div>
        )
    }
}