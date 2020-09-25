import React from 'react';
import { Route } from 'react-router-dom'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Profile from './Containers/Profile'
import Header from './Containers/Header'
import './Css/App.css';

export default class App extends React.Component {

  state = {
    user: "",
    token: "",
    signup: false
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
      .then(userData => this.setState(() => ({
        user: userData.user,
        token: userData.jwt
      })))
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
      .then(userData => this.setState(() => ({
        user: userData.user,
        token: userData.jwt
      })))
  }

  displayHandler = () => {
    this.setState((previousState) => ({ signup: !previousState.signup }))
  }

  closeSignup = () => {
    this.setState(() => ({ signup: false }))
  }

  render() {
    return (
      <div id="app-container">
        {/* {this.state.signup ? <SignUp appSignupHandler={this.appSignupHandler} displayHandler={this.displayHandler} /> : <Login appLoginHandler={this.appLoginHandler} displayHandler={this.displayHandler} />} */}
        <Header />
        <Profile />
      </div>
    )
  }


}


