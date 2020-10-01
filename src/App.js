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
    signup: false
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
          this.setState(() => ({
            user: userData.user
          }))
        })
    } else {
      this.props.history.push('/login')
    }
  }

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
    formData.append('user[email]', userInfo.email)
    formData.append('user[password]', userInfo.password)
    formData.append('user[password_confirmation]', userInfo.password_confirmation)
    formData.append('profile_picture', userInfo.profile_picture)
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



  render() {
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
                  appLogout={this.appLogout}
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
