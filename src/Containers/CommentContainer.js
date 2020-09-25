import React from 'react'
import { createPortal } from 'react-dom'
// import '../Css/CommentContainer.css'
// import { Route, NavBar } from 'react-router-dom'
import Comment from '../Components/Comment'

export default class PostContainer extends React.Component {

    state = {
        commentNum: 3,
        comments: this.props.comments
    }

    componentDidMount() {
        this.renderComments()
    }
    renderComments = () => {
        let comments = this.state.comments
        for (let i = 0; i < this.state.commentNum; i++) {
            let comment = { content: "This is a comment. And these are all the words...", user_id: i, created_at: `6:1${i}PM` }
            comments.push(<Comment key={i} comment={comment} />)
        }
        this.setState(() => ({ comments: comments }))
    }

    render() {
        return (
            <div className="comment-container">
                {this.state.comments}
            </div>
        )
    }
}