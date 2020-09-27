import React from 'react'
import '../Css/PostContent.css'

export default function PostContent(props) {
    return <div className="post-content">{props.content}</div>
}