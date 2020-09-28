import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../Css/PostContent.css'

function clickHandler(e, props) {
    localStorage.setItem("userId", props.post.user_id)
}

function PostContent(props) {

    return (
        <>
            <div className="post-header">
                <h3 onClick={(e) => clickHandler(e, props)}>Posted by <Link to={`/profile/${props.post.user_id}`} >{props.post.user_name}</Link> at {props.post.created_at}</h3>
            </div>
            <div className="post-content">{props.post.content}</div>
        </>
    )
}

export default withRouter(PostContent)