import React from 'react'
import '../Css/Profile.css'
import { withRouter } from 'react-router-dom'
import InfoCard from '../Containers/InfoCard'
import PostForm from '../Components/PostForm'
import PostContainer from './PostContainer'

class Profile extends React.Component {

    state = {
        posts: [],
        followingArray: []
    }

    componentDidMount() {
        this.postsUserFetch()
    }

    postsUserFetch = () => {
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

    follow = () => {
        const configObj = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({ follow: { follower_id: this.props.user.id, followed_user_id: parseInt(localStorage.getItem("userId")) } })
        }
        fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/follow`, configObj)
            .then(resp => resp.json())
            .then(console.log)
        //Returns the current user with no followers or followings associations
    }

    getUsersFollowings = () => {
        const configObj = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-type': 'application/json',
                'Accepts': 'application/json'
            }
            // body: {NO BODY}
        }

        fetch(`http://localhost:3000/api/v1/users/${localStorage.getItem("userId")}/followings`, configObj)
            .then(resp => resp.json())
            .then(usersArray => this.setState(() => ({ followingArray: usersArray.followers })))
    }

    render() {
        return (
            <div id="profile">
                <InfoCard user={this.props.user} follow={this.follow} followingArray={this.state.followingArray} currentUserFollowing={this.props.currentUserFollowing} />
                <PostForm formSubmitHandler={this.formSubmitHandler} />
                {this.state.posts ? <PostContainer user={this.props.user} posts={this.state.posts} /> : null}
            </div>
        )
    }
}

export default withRouter(Profile)