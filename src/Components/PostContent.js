import React from 'react'
import '../Css/PostContent.css'

export default function PostContent(props) {



    return (
        <>
            <div className="post-header">
                <h3>Posted by {props.post.user_name} at {props.post.created_at}</h3>
            </div>
            <div className="post-content">{props.post.content}</div>
        </>
    )
}