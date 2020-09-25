import React from 'react'

export default function PostHeader(props) {
    return (
        <div className="post-header">
            <h3>Posted by {props.post.user_id} at {props.post.created_at}</h3>
        </div>
    )
}