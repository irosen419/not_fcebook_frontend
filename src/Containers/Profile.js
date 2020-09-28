import React from 'react'
import '../Css/Profile.css'
// import { Route, NavBar } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Header from '../Containers/Header'
import PostForm from '../Components/PostForm'
import PostContainer from './PostContainer'

class Profile extends React.Component {

    state = {
        posts: [],
        profileId: null
    }

    componentDidMount() {
        this.postsUserFetch()
    }

    postsUserFetch = () => {
        let userId = this.props.user.id
        const configObj = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
            // body: {NO BODY}
        }
        fetch(`http://localhost:3000/api/v1/users/${localStorage.getItem("userId")}`, configObj)
            .then(resp => resp.json())
            .then(user => this.setState(() => ({ posts: user.user.posts })))
        // Returns all posts for the user who's ID is passed in with associated likes, comments.
    }
    //user => this.setState(() => ({ posts: user.user.posts }))
    formSubmitHandler = (content) => {
        this.postCreateFetch(content)
    }

    postCreateFetch = (newPostObj) => {
        const newPost = {
            content: newPostObj.content,
            user_id: this.props.user.id
        }
        const configObj = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({ post: newPost })
        }
        fetch(`http://localhost:3000/api/v1/posts/`, configObj)
            .then(resp => resp.json())
            .then(postObj => this.setState(() => ({ posts: [...this.state.posts, postObj.post] })))
        // Returns new post.
    }
    //postObj => this.setState(() => ({ posts: [...this.state.posts, postObj] }))

    formClickHandler = (userId) => {
        this.setState(() => ({ profileId: userId }), () => console.log(this.state))
    }

    render() {

        return (
            <div id="profile">
                <Header appLogout={this.props.appLogout} formClickHandler={this.formClickHandler} />
                <PostForm formSubmitHandler={this.formSubmitHandler} />
                {this.state.posts ? <PostContainer user={this.props.user} posts={this.state.posts} /> : null}
            </div>
        )
    }
}

export default withRouter(Profile)