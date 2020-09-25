import React from 'react'
import '../Css/PostContainer.css'
// import { Route, NavBar } from 'react-router-dom'
import Post from '../Components/Post'

export default class PostContainer extends React.Component {

    state = {
        postNum: 10,
        posts: []
    }

    componentDidMount() {
        this.renderPosts()
    }

    renderPosts = () => {
        let posts = this.state.posts
        for (let i = 0; i < this.state.postNum; i++) {
            let post = { content: "This is a post. And these are all the words that I aam typing blah blah blah...", user_id: i, comments: [], created_at: `5:1${i}PM` }
            posts.push(<Post key={i} post={post} />)
        }
        this.setState(() => ({ posts: posts }))
    }

    render() {
        return (
            <div id="post-container">
                {this.state.posts}
            </div>
        )
    }
}