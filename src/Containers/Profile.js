import React from 'react'
import '../Css/Profile.css'
// import { Route, NavBar } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import PostForm from '../Components/PostForm'
import PostContainer from './PostContainer'

class Profile extends React.Component {

    state = {
        user: this.props.user,
        posts: []
    }

    componentDidMount() {
        this.postsUserFetch()
    }

    postsUserFetch = () => {
        const configObj = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.props.token}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
            // body: {NO BODY}
        }
        fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`, configObj)
            .then(resp => resp.json())
            .then(user => this.setState(() => ({ 
                posts: user.user.posts 
            })))
        // Returns all posts for the user who's ID is passed in with associated likes, comments.
    }
    //
    formSubmitHandler = (content) => {
        this.postCreateFetch(content)
    }

    postCreateFetch = (newPostObj) => {
        const newPost = {
            content: newPostObj.content,
            user_id: this.state.user.id
        }
        const configObj = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.props.token}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({ post: newPost })
        }
        fetch(`http://localhost:3000/api/v1/posts/`, configObj)
            .then(resp => resp.json())
            .then(postObj => this.setState(() => ({ 
                posts: [...this.state.posts, postObj.post] 
            })))
        // Returns new post.
    }
    //postObj => this.setState(() => ({ posts: [...this.state.posts, postObj] }))
    render() {
        console.log("Profile: ", this.state.posts)
        return (
            <div id="profile">
                <PostForm formSubmitHandler={this.formSubmitHandler} />
                {this.state.posts ? <PostContainer userId={this.state.user.id} token={this.props.token} posts={this.state.posts} /> : null}
            </div>
        )
    }
}

export default withRouter(Profile)