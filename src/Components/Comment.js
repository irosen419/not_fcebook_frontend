import React from 'react'
import '../Css/Comment.css'

export default function Comment(props) {
    return (
        <div className="comment">
            <strong><p>{props.comment.user_id} said:</p></strong>
            <p>{props.comment.content}</p>
        </div>
    )
}