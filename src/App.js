import React from 'react';
// import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { Route, Switch, withRouter } from 'react-router-dom'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Profile from './Containers/Profile'
import Home from './Containers/Home'
import Header from './Containers/Header'
// import TestFetch from './Components/TestFetch';
import './Css/App.css';

class App extends React.Component {

  state = {
    user: "",
    signup: false,
    followingArray: []
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
          this.setState(() => ({ user: userData.user }), () => this.getUsersFollowings())
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
    const configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({ user: userInfo })
    }
    fetch('http://localhost:3000/api/v1/users', configObj)
      .then(resp => resp.json())
      .then(userData => {
        localStorage.setItem("token", userData.jwt);
        localStorage.setItem("userId", userData.user.id);
        this.setState(() => ({
          user: userData.user,
          signup: false
        }), () => this.props.history.push(`/home`))
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
      // body: {NO BODY}
    }

    fetch(`http://localhost:3000/api/v1/users/${this.state.user.id}/followings`, configObj)
      .then(resp => resp.json())
      .then(usersArray => this.setState(() => ({ followingArray: usersArray.followers })))
  }

  render() {
    return (
      <div id="app-container">
        {this.state.user ? <Header user={this.state.user} appLogout={this.appLogout} formClickHandler={this.formClickHandler} /> : null}
        {this.state.signup ? <SignUp appSignupHandler={this.appSignupHandler} displayHandler={this.displayHandler} /> : null}
        <Switch>
          
          <Route 
            path='/profile/:id' 
            render={() => { return this.state.user ? 
              <Profile 
                user={this.state.user} 
                appLogout={this.appLogout} 
                currentUserFollowing={this.state.followingArray} 
              /> 
            : null }} 
          />
          <Route 
            path='/home' 
            render={() => { return this.state.user ? 
              <Home 
                user={this.state.user} 
                followingArray={this.state.followingArray} 
                appLogout={this.appLogout} 
              /> 
            : null }} 
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
