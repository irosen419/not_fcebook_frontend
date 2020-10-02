import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Profile from './Containers/Profile'
import Home from './Containers/Home'
import Header from './Containers/Header'
import PhotoModal from './Components/PhotoModal'
import './Css/App.css';

class App extends React.Component {

  state = {
    user: "",
    signup: false,
    error: false,
    photoModal: false,
    photoArray: []
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
      .catch(() => this.setState(() => ({ error: true })))
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
        localStorage.setItem("token", userData.jwt);
        localStorage.setItem("userId", userData.user.id);
        this.setState(() => ({
          user: userData.user,
          signup: false,
          error: false
        }), () => this.props.history.push(`/profile/${userData.user.id}`))
      })
      .catch(() => this.setState(() => ({ error: true })))
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

  showOrHideModal = (photoArray) => {
    this.setState((previousState) => ({ photoModal: !previousState.photoModal, photoArray: photoArray }))
  }

  render() {
    return (
      <div id="app-container">
        {this.state.user ? <Header user={this.state.user} appLogout={this.appLogout} formClickHandler={this.formClickHandler} /> : null}
        {this.state.signup ? <SignUp appSignupHandler={this.appSignupHandler} displayHandler={this.displayHandler} error={this.state.error} /> : null}
        {this.state.photoModal ? <PhotoModal showOrHideModal={this.showOrHideModal} photos={this.state.photoArray} showOrHideModal={this.showOrHideModal} /> : null}
        <Switch>

          <Route
            path='/profile/:id'
            render={() => {
              return this.state.user ?
                <Profile
                  user={this.state.user}
                  appLogout={this.appLogout}
                  showOrHideModal={this.showOrHideModal}
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
                  showOrHideModal={this.showOrHideModal}
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
                error={this.state.error}
              />}
          />

        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
