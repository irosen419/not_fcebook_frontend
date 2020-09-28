import React from 'react';
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
      }), () => this.props.history.push(`/profile/${this.state.user.id}`)))
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
        token: userData.jwt,
        signup: false
      }), () => this.props.history.push(`/profile/${this.state.user.id}`)))
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
        <Switch>
          {this.state.signup ? <SignUp userId={this.state.user.id} appSignupHandler={this.appSignupHandler} displayHandler={this.displayHandler} /> : null}
          <Route path='/profile/:id' render={() => <Profile user={this.state.user} token={this.state.token} />} />
          <Route path="/login" render={() => <Login appLoginHandler={this.appLoginHandler} displayHandler={this.displayHandler} />} />
          {/* <Header />*/}
        </Switch>
        <TestFetch />
      </div>
    )
  }
}

export default withRouter(App)
