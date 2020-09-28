import React from 'react'
import '../Css/PostContainer.css'
import Post from '../Components/Post'

export default class PostContainer extends React.Component {

    componentDidMount() {
        this.renderPosts()
    }

    renderPosts = () => {
        let posts = this.props.posts
        return posts.map(post => <Post key={post.id} user={this.props.user} post={post} />)
    }

    render() {

        return (
            <div id="post-container">
                {this.renderPosts()}
            </div>
        )
    }
}