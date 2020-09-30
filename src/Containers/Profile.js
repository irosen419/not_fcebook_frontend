import React from 'react'
import '../Css/Profile.css'
import { withRouter } from 'react-router-dom'
import InfoCard from '../Containers/InfoCard'
import PostForm from '../Components/PostForm'
import PostContainer from './PostContainer'

class Profile extends React.Component {

    state = {
        posts: [],
        profileUser: "",
        followingArray: [], 
    }

    componentDidMount() {
        this.profileUserFetch()
        this.getUsersFollowings()
    }

    componentDidUpdate(pP) {
        if (pP.newPost !== this.props.newPost) {
            this.setState((pS) => ({ posts: [this.props.newPost.post, ...pS.posts] }))
        } else if (pP.updatedPost !== this.props.updatedPost) {
            const newArray = this.state.posts.filter(post => post.id !== this.props.updatedPost.post.id)
            this.setState(() => ({ posts: [this.props.updatedPost.post, ...newArray] }))
        }
    }

    profileUserFetch = () => {
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
            .then(user => {
                console.log(user)
                this.setState(() => ({
                    posts: user.user.posts,
                    profileUser: user.user
                }))
            })
        // Returns all posts for the user who's ID is passed in with associated likes, comments.
    }

    deletePost = (postObj) => {
        const configObj = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({ id: postObj.id, post: postObj })
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
                    user={this.state.profileUser}
                    followOrUnfollow={this.props.followOrUnfollow}
                    followingArray={this.state.followingArray}
                    currentUserFollowing={this.props.currentUserFollowing}
                />
                <div id="posts">
                    <PostForm
                        content={this.props.content}
                        changeHandler={this.props.changeHandler}
                        submitHandler={this.props.submitHandler}
                    />
                    {this.state.posts ?
                        <PostContainer
                            user={this.props.user}
                            posts={this.state.posts}
                            edit={this.props.edit}
                            changeHandler={this.props.changeHandler}
                            submitHandler={this.props.submitHandler}
                            editContent={this.props.editContent}
                            deletePost={this.deletePost}
                        />
                        : null}
                </div>
            </div>
        )
    }
}

export default withRouter(Profile)