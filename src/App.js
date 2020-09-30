import React from 'react';
// import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { Route, Switch, withRouter } from 'react-router-dom'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Profile from './Containers/Profile'
import Home from './Containers/Home'
import Header from './Containers/Header'
import './Css/App.css';

class App extends React.Component {

  state = {
    user: "",
    signup: false,
    followingArray: [],
    currentUserPosts: [],
    content: "",
    editContent: "",
    editPostObj: null,
    newPost: "",
    updatedPost: ""
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      fetch('http://localhost:3000/api/v1/profile', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(resp => resp.json())
        .then(userData => {
          console.log(userData)
          this.setState(() => ({
            user: userData.user,
            currentUserPosts: userData.user.posts
          }), () => this.getUsersFollowings())
        })
    } else {
      this.props.history.push('/login')
    }
  }
  //userData => this.setState(() => ({ user: userData.user }))

  appLoginHandler = (userInfo) => {
    const configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({ user: userInfo })
    }
    fetch('http://localhost:3000/api/v1/login', configObj)
      .then(resp => resp.json())
      .then(userData => {

        localStorage.setItem("token", userData.jwt);
        localStorage.setItem("userId", userData.user.id);
        this.setState(() => ({
          user: userData.user
        }), () => this.props.history.push(`/home`))
      })
  }

  appSignupHandler = (userInfo) => {
    let formData = new FormData()
    formData.append('user[first_name]', userInfo.first_name)
    formData.append('user[last_name]', userInfo.last_name)
    formData.append('user[birthdate]', userInfo.birthdate)
    formData.append('profile_picture', userInfo.profile_picture)
    formData.append('user[email]', userInfo.email)
    formData.append('user[password]', userInfo.password)
    formData.append('user[password_confirmation]', userInfo.password_confirmation)
    console.log(formData)
    const configObj = {
      method: 'POST',
      body: formData
    }
    fetch('http://localhost:3000/api/v1/users', configObj)
      .then(resp => resp.json())
      .then(userData => {
        console.log(userData)
        localStorage.setItem("token", userData.jwt);
        localStorage.setItem("userId", userData.user.id);
        this.setState(() => ({
          user: userData.user,
          signup: false
        }), () => this.props.history.push(`/profile/${userData.user.id}`))
      })
  }

  displayHandler = () => {
    this.setState((previousState) => ({ signup: !previousState.signup }))
  }

  closeSignup = () => {
    this.setState(() => ({ signup: false }))
  }

  formClickHandler = (userId) => {
    this.setState(() => ({
      profileId: userId
    }))
  }

  appLogout = () => {
    localStorage.clear("token")
    this.props.history.push('/login')
    this.setState({ user: "" })
  }

  getUsersFollowings = () => {
    const configObj = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-type': 'application/json',
        'Accepts': 'application/json'
      }
    }
    fetch(`http://localhost:3000/api/v1/users/${this.state.user.id}/followings`, configObj)
      .then(resp => resp.json())
      .then(usersArray => this.setState(() => ({ followingArray: usersArray.followers })))
  }

  followOrUnfollow = (e) => {
    if (e.target.innerText === 'Follow') {
      this.follow()
    } else if (e.target.innerText === 'Unfollow') {
      this.unfollow()
    }
  }

  follow = () => {
    const configObj = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({ follow: { follower_id: this.state.user.id, followed_user_id: parseInt(localStorage.getItem("userId")) } })
    }
    fetch(`http://localhost:3000/api/v1/users/${this.state.user.id}/follow`, configObj)
      .then(resp => resp.json())
      .then(user => this.setState((previousState) => ({ followingArray: [...previousState.followingArray, user.user] })))
    //Returns the current user with no followers or followings associations
  }

  unfollow = () => {
    const configObj = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({ follow: { follower_id: this.state.user.id, followed_user_id: parseInt(localStorage.getItem("userId")) } })
    }
    fetch(`http://localhost:3000/api/v1/users/${this.state.user.id}/unfollow`, configObj)
      .then(resp => resp.json())
      .then(user => {
        let newArray = this.state.followingArray
        let foundUser = newArray.find(userObj => userObj.id === user.user.id)
        newArray.splice(newArray.indexOf(foundUser), 1)
        this.setState(() => ({ followingArray: newArray }))
      })
    //Returns the current user with no followers or followings associations
  }

  submitHandler = () => {
    console.log("submitting")
    if (this.state.editPostObj) {
      // -- EDIT POST FETCH -- //
      const newPost = {
        content: this.state.editContent,
        user_id: this.state.user.id
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
          if (window.location.pathname.split('/')[1] === 'home') {
            console.log("edited from home")
            let newArray = this.state.currentUserPosts
            let foundPost = newArray.find(post => post.id === updatedPost.post.id)
            newArray[newArray.indexOf(foundPost)] = updatedPost.post
            this.setState(() => ({ currentUserPosts: newArray }))
          } else {
            this.setState(() => ({
              updatedPost: updatedPost,
              editContent: "",
              editPostObj: ""
            }), this.setState(() => ({ updatedPost: "" })))
          }
        })

    } else {
      // -- NEW POST FETCH -- //

      let profileUserId
      if (window.location.pathname.split('/')[1] === 'home') {
        profileUserId = this.state.user.id
      } else {
        profileUserId = parseInt(window.location.pathname.split('/')[2])
      }
      const newPost = {
        content: this.state.content,
        user_id: this.state.user.id,
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
        .then(postObj => {
          this.setState(() => ({
            currentUserPosts: [...this.state.currentUserPosts, postObj.post],
            newPost: postObj,
            content: ""
          }))
        })
    }
  }

  changeHandler = (e) => {
    e.persist()
    this.setState(() => ({
      [e.target.name]: e.target.value
    }))
  }

  edit = (postObj) => {
    console.log("edit obj: ", postObj)
    this.setState(() => ({
      editContent: postObj.content,
      editPostObj: postObj
    }))
  }

  appDeletePost = (postObj) => {
    console.log("deleting post")
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
        // if (!emptyObj.id) {
        //   const newArray = this.state.posts.filter(post => post.id !== postObj.id)
        //   this.setState(() => ({
        //     posts: newArray
        //   }))
        // }
        if (window.location.pathname.split('/')[1] === 'home') {
          const newArray = this.state.currentUserPosts.filter(post => post.id !== postObj.id)
          this.setState(() => ({
            currentUserPosts: newArray
          }))
        }
      })


  }

  render() {
    console.log("App Posts: ", this.state.currentUserPosts)
    return (
      <div id="app-container">
        {this.state.user ? <Header user={this.state.user} appLogout={this.appLogout} formClickHandler={this.formClickHandler} /> : null}
        {this.state.signup ? <SignUp appSignupHandler={this.appSignupHandler} displayHandler={this.displayHandler} /> : null}
        <Switch>

          <Route
            path='/profile/:id'
            render={() => {
              return this.state.user ?
                <Profile
                  user={this.state.user}
                  appLogout={this.appLogout}
                  currentUserFollowing={this.state.followingArray}
                  followOrUnfollow={this.followOrUnfollow}
                  edit={this.edit}
                  changeHandler={this.changeHandler}
                  submitHandler={this.submitHandler}
                  content={this.state.content}
                  editContent={this.state.editContent}
                  appDeletePost={this.appDeletePost}
                  newPost={this.state.newPost}
                  updatedPost={this.state.updatedPost}
                />
                : null
            }}
          />
          <Route
            path='/home'
            render={() => {
              return this.state.user ?
                <Home
                  user={this.state.user}
                  followingArray={this.state.followingArray}
                  currentUserPosts={this.state.currentUserPosts}
                  appLogout={this.appLogout}
                  changeHandler={this.changeHandler}
                  submitHandler={this.submitHandler}
                  edit={this.edit}
                  editContent={this.state.editContent}
                  content={this.state.content}
                  appDeletePost={this.appDeletePost}
                />
                : null
            }}
          />
          <Route
            path="/login"
            render={() =>
              <Login
                appLoginHandler={this.appLoginHandler}
                displayHandler={this.displayHandler}
              />}
          />

        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
