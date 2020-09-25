import React from 'react'
import '../Css/Post.css'
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import CommentContainer from '../Containers/CommentContainer'

export default class Post extends React.Component {
    render() {
        return (
            <div className="post">
                <PostHeader post={this.props.post} />
                <PostContent content={this.props.post.content} />
                <CommentContainer comments={this.props.post.comments} />
            </div>
        )
    }
}