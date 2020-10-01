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
        profileFriends: [],
        content: "",
        post_photo: null,
        editContent: "",
        editPostObj: null,
    }

    componentDidMount() {
        this.profileUserFetch()
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
        fetch(`http://localhost:3000/api/v1/users/${profileId}/profile`, configObj)
            .then(resp => resp.json())
            .then(profile => {
                console.log(profile)
                this.setState(() => ({
                    posts: profile.posts,
                    profileUser: profile.user,
                    profileFriends: profile.user.profile_friends
                }))
            })
    }


    submitHandler = () => {
        if (this.state.editPostObj) {
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
                    let newArray = this.state.posts
                    let foundPost = newArray.find(post => post.id === updatedPost.post.id)
                    newArray[newArray.indexOf(foundPost)] = updatedPost.post
                    this.setState(() => ({
                        posts: newArray,
                        editContent: "",
                        editPostObj: ""
                    }))
                })
        } else {
            // -- NEW POST FETCH -- //
            let formData = new FormData()
            formData.append('post[content]', this.state.content)
            formData.append('post[user_id]', this.props.user.id)
            formData.append('post[profile_user_id]', this.state.profileUser.id)
            formData.append('post_photo', this.state.post_photo)
            const configObj = {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
                body: formData
            }
            console.log(configObj)
            fetch(`http://localhost:3000/api/v1/posts/`, configObj)
                .then(resp => resp.json())
                .then(postObj => {
                    console.log(postObj)
                    this.setState(() => ({
                        posts: [postObj.post, ...this.state.posts],
                        content: "",
                        post_photo: null
                    }))
                })



            // const newPost = {
            // content: this.state.content,
            // user_id: this.props.user.id,
            // profile_user_id: this.state.profileUser.id
            // }
            // const configObj = {
            // method: 'POST',
            // headers: {
            //     'Authorization': `Bearer ${localStorage.getItem("token")}`,
            //     'Content-Type': 'application/json',
            //     'Accepts': 'application/json'
            // },
            // body: JSON.stringify({ post: newPost })
            // }

        }

    }
    changeHandler = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }
    pictureHandler = (e) => {
        e.persist()
        if (e.target.files[0]) {
            this.setState({ post_photo: e.target.files[0] })
        }
    }

    edit = (postObj) => {
        console.log("edit obj: ", postObj)
        this.setState(() => ({
            editContent: postObj.content,
            editPostObj: postObj
        }))
    }

    follow = () => {
        console.log('current user', this.props.user)
        const configObj = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({ follow: { follower_id: this.props.user.id, followed_user_id: this.state.profileUser.id } })
        }
        fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/follow`, configObj)
            .then(resp => resp.json())
            .then(message => {
                console.log(message)
                if (message.success) {
                    const u = {
                        id: this.props.user.id,
                        user_name: this.props.user.user_name,
                        img_url: this.props.user.img_url
                    }
                    this.setState(() => ({
                        profileFriends: [u, ...this.state.profileFriends]
                    }))
                }
            })
    }

    unfollow = () => {
        const configObj = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({ follow: { follower_id: this.props.user.id, followed_user_id: this.state.profileUser.id } })
        }
        fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/unfollow`, configObj)
            .then(resp => resp.json())
            .then(message => {
                if (message.success) {
                    const newArray = this.state.profileFriends.filter(friend => friend.id !== this.props.user.id)
                    this.setState(() => ({
                        profileFriends: newArray
                    }))
                }
            })
    }

    followOrUnfollow = (e) => {
        if (e.target.innerText === 'Follow') {
            this.follow()
        } else if (e.target.innerText === 'Unfollow') {
            this.unfollow()
        }
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
            .then(message => {
                if (message.success) {
                    const newArray = this.state.posts.filter(post => post.id !== postObj.id)
                    this.setState(() => ({
                        posts: newArray
                    }))
                }
            })
    }

    render() {
        return (
            <div id="profile">
                <InfoCard
                    profileUser={this.state.profileUser}
                    currentUser={this.props.user}
                    followOrUnfollow={this.followOrUnfollow}
                    profileFriends={this.state.profileFriends}
                />
                <div id="posts">
                    <PostForm
                        content={this.state.content}
                        pictureHandler={this.pictureHandler}
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
                            showOrHideModal={this.props.showOrHideModal}
                        />
                        : null}
                </div>
            </div>
        )
    }
}

export default withRouter(Profile)