import React from 'react';
// import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { Route, Switch, withRouter } from 'react-router-dom'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Profile from './Containers/Profile'
// import Header from './Containers/Header'
import TestFetch from './Components/TestFetch';
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
          this.setState(() => ({ user: userData.user }))
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
        localStorage.setItem("token", userData.jwt)
        localStorage.setItem("userId", userData.user.id)
        this.setState(() => ({
          user: userData.user
        }), () => this.props.history.push(`/profile/${this.state.user.id}`))
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
        this.setState(() => ({
          user: userData.user,
          signup: false
        }), () => this.props.history.push(`/profile/${this.state.user.id}`))
      })
  }

  displayHandler = () => {
    this.setState((previousState) => ({ signup: !previousState.signup }))
  }

  closeSignup = () => {
    this.setState(() => ({ signup: false }))
  }

  appLogout = () => {
    localStorage.clear("token")
    this.props.history.push('/login')
    this.setState({ user: "" })
  }

  render() {
    return (
      <div id="app-container">
        <Switch>
          {this.state.signup ? <SignUp appSignupHandler={this.appSignupHandler} displayHandler={this.displayHandler} /> : null}
          <Route path='/profile/:id' render={() => { return this.state.user ? <Profile user={this.state.user} appLogout={this.appLogout} formClickHandler={this.formClickHandler} /> : null }} />
          {/* {this.state.user ? <Header /> : null} */}
          <Route path="/login" render={() => <Login appLoginHandler={this.appLoginHandler} displayHandler={this.displayHandler} />} />
        </Switch>
        <TestFetch />
      </div>
    )
  }
}

export default withRouter(App)
