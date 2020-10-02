import React from 'react'
import { withRouter } from 'react-router-dom'
import Post from '../Components/Post'
import PostForm from '../Components/PostForm'
import '../Css/Home.css'
import '../Css/Post.css'

class Home extends React.Component {

    state = {
        currentUser: this.props.user,
        homePosts: [],
        content: "",
        editContent: "",
        editPostObj: null,
        mounted: false
    }

    componentDidMount() {
        this.getHomePosts()
        this.setState(() => ({ mounted: true }))
    }

    getHomePosts = () => {
        const configObj = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        }
        fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/home`, configObj)
            .then(resp => resp.json())
            .then(posts => {
                this.setState(() => ({
                    homePosts: posts.posts
                }))
            })
    }

    sortByDate = (array) => {
        return array.sort((a, b) => {
            if (a.created_at > b.created_at) return -1;
            if (a.created_at < b.created_at) return 1;
            return 0;
        });

    }

    submitHandler = () => {
        if (this.state.editPostObj) {
            // -- EDIT POST FETCH -- //
            const newPost = {
                content: this.state.editContent,
                user_id: this.state.currentUser.id,
                profile_user_id: this.state.currentUser.id
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
                    let newArray = this.state.homePosts
                    let foundPost = newArray.find(post => post.id === updatedPost.post.id)
                    newArray[newArray.indexOf(foundPost)] = updatedPost.post
                    this.setState(() => ({
                        homePosts: newArray,
                        editContent: "",
                        editPostObj: ""
                    }))
                })
        } else {
            // -- NEW POST FETCH -- //
            const newPost = {
                content: this.state.content,
                user_id: this.state.currentUser.id,
                profile_user_id: this.state.currentUser.id
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
                .then(postObj => {
                    this.setState(() => ({
                        homePosts: [postObj.post, ...this.state.homePosts],
                        content: ""
                    }))
                })
        }
    }

    edit = (postObj) => {
        this.setState(() => ({
            editContent: postObj.content,
            editPostObj: postObj
        }))
    }

    changeHandler = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
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
                    const newArray = this.state.homePosts.filter(post => post.id !== postObj.id)
                    this.setState(() => ({
                        homePosts: newArray
                    }))
                }
            })
    }



    renderPosts = () => {
        const arrayOfPosts = this.sortByDate(this.state.homePosts)
        return arrayOfPosts.map(post =>
            <Post
                post={post}
                key={post.id}
                changeHandler={this.changeHandler}
                submitHandler={this.submitHandler}
                editContent={this.state.editContent}
                edit={this.edit}
                user={this.props.user}
                deletePost={this.deletePost}
                showOrHideModal={this.props.showOrHideModal}
            />
        )
    }

    mounted = () => {
        return this.state.mounted ? <h4>You need to create some posts or follow some users before you can see anything here...</h4> : <h4>Loading...</h4>
    }

    render() {
        return (
            <div id="home" >
                <PostForm
                    content={this.state.content}
                    changeHandler={this.changeHandler}
                    submitHandler={this.submitHandler}
                />
                {this.state.homePosts.length > 0 ? this.renderPosts() : this.mounted()}
            </div>
        )
    }
}

export default withRouter(Home)