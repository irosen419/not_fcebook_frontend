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
        profileId: null,
        content: "",
        editPostObj: ""
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
        }
        fetch(`http://localhost:3000/api/v1/users/${localStorage.getItem("userId")}`, configObj)
            .then(resp => resp.json())
            .then(user => this.setState(() => ({ 
                posts: user.user.posts 
            })))
        // Returns all posts for the user who's ID is passed in with associated likes, comments.
    }

    editPost = (postObj) => {
        this.setState(()=>({
            content: postObj.content,
            editPostObj: postObj
        }))
    }

    deletePost = (postObj) => {
        
    }

    submitHandler = () => {
        if (this.state.editPostObj.id){
            // -- EDIT POST FETCH -- //

        } else {
            // -- NEW POST FETCH -- //
            const newPost = {
                content: this.state.content,
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
                .then(postObj => this.setState(() => ({ 
                    posts: [postObj.post, ...this.state.posts],
                    content: ""
                })))
        }
    }

    changeHandler = (e) => {
        e.persist()
        this.setState(()=>({
            content: e.target.value
        }))
    }

    formClickHandler = (userId) => {
        this.setState(() => ({ profileId: userId }), () => console.log(this.state))
    }

    render() {

        return (
            <div id="profile">
                <Header 
                    appLogout={this.props.appLogout} 
                    formClickHandler={this.formClickHandler} 
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
                        editPost={this.editPost}
                        deletePost={this.deletePost}
                    /> 
                : null }
            </div>
        )
    }
}

export default withRouter(Profile)