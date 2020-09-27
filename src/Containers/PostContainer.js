import React from 'react'
import '../Css/PostContainer.css'
// import { Route, NavBar } from 'react-router-dom'
import Post from '../Components/Post'

export default class PostContainer extends React.Component {

    state = {
        posts: this.props.posts
    }

    componentDidMount() {
        this.renderPosts()
    }

    renderPosts = () => {
        let posts = this.props.posts
        return posts.map(post => <Post userId={this.props.userId} token={this.props.token} key={post.id} post={post} />)
    }

    render() {
        console.log(this.state)
        return (
            <div id="post-container">
                {this.renderPosts()}
            </div>
        )
    }
}