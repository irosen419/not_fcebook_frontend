import React from 'react'
import '../Css/Profile.css'
import { withRouter } from 'react-router-dom'
import InfoCard from '../Containers/InfoCard'
import PostForm from '../Components/PostForm'
import PostContainer from './PostContainer'

class Profile extends React.Component {

    state = {
        posts: [],
        followingArray: [],
        // profileId: null,
        content: "",
        editContent: "",
        editPostObj: ""
    }

    componentDidMount() {
        this.postsUserFetch()
        this.getUsersFollowings()
    }

    postsUserFetch = () => {
        const profileId = window.location.pathname.split('/')[2]
        const configObj = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        }
        fetch(`http://localhost:3000/api/v1/users/${profileId}`, configObj)
            .then(resp => resp.json())
            .then(posts => {
                console.log(posts)
                this.setState(() => ({ 
                    posts: posts.posts 
            }))
        })
        // Returns all posts for the user who's ID is passed in with associated likes, comments.
    }

    deletePost = (postObj) => {
        const configObj = {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer {this.state/props.token}',
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
        }
        fetch(`http://localhost:3000/api/v1/posts/${postObj.id}`, configObj)
            .then(resp => resp.json())
            .then(emptyObj => {
                if (!emptyObj.id) {
                    const newArray = this.state.posts.filter(post => post.id !== postObj.id)
                    this.setState(() => ({
                        posts: newArray
                    }))
                }
            })
    }

    submitHandler = () => {
        if (this.state.editPostObj.id) {
            // -- EDIT POST FETCH -- //
            const newPost = {
                content: this.state.editContent,
                user_id: this.props.user.id
            }
            const configObj = {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                },
                body: JSON.stringify({ post: newPost })
            }
            fetch(`http://localhost:3000/api/v1/posts/${this.state.editPostObj.id}`, configObj)
                .then(resp => resp.json())
                .then(updatedPost => {
                    const newArray = this.state.posts.filter(post => post.id !== updatedPost.post.id)
                    this.setState(() => ({
                        posts: [updatedPost.post, ...newArray],
                        editContent: "",
                        editPostObj: ""
                    }))
                })

        } else {
            // -- NEW POST FETCH -- //
            const profileUserId = parseInt(localStorage.getItem("userId"))
            const newPost = {
                content: this.state.content,
                user_id: this.props.user.id,
                profile_user_id: profileUserId
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
                .then(postObj => this.setState(() => ({
                    posts: [postObj.post, ...this.state.posts],
                    content: ""
                })))
        }
    }

    changeHandler = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    edit = (postObj) => {
        this.setState(() => ({
            editContent: postObj.content,
            editPostObj: postObj
        }))
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
                <InfoCard
                    user={this.props.user}
                    followOrUnfollow={this.props.followOrUnfollow}
                    followingArray={this.state.followingArray}
                    currentUserFollowing={this.props.currentUserFollowing}
                />

                <PostForm
                    content={this.state.content}
                    changeHandler={this.changeHandler}
                    submitHandler={this.submitHandler}
                />

                {this.state.posts ?
                    <PostContainer
                        user={this.props.user}
                        posts={this.state.posts}
                        edit={this.edit}
                        changeHandler={this.changeHandler}
                        submitHandler={this.submitHandler}
                        editContent={this.state.editContent}
                        deletePost={this.deletePost}
                    />
                    : null}
            </div>
        )
    }
}

export default withRouter(Profile)