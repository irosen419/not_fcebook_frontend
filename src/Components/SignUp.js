import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Css/Signup.css'

export default class SignUp extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    birthdate: "",
    profile_picture: "",
    email: "",
    password: "",
    password_confirmation: ""
  }

  signupHandler = (e) => {
    e.preventDefault()
    this.props.appSignupHandler(this.state)
  }

  changeHandler = (e) => {
    e.persist()
    console.log(e.target.files)
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }))
  }
  pictureHandler = (e) => {
    e.persist()
    if (e.target.files[0]) {
      this.setState({ profile_picture: e.target.files[0] })
    }
  }

  clickHandler = () => {
    this.props.displayHandler()
  }

  render() {
    return (
      <div id="signup-modal">
        <div id="signup">
          <button className="close" onClick={this.clickHandler}>X</button>
          <form id="signup-form" onSubmit={this.signupHandler}>
            <input type="text" name="first_name" placeholder="First name" value={this.state.firstName} onChange={this.changeHandler} />
            <input type="text" name="last_name" placeholder="Last name" value={this.state.lastName} onChange={this.changeHandler} />
            <input type="date" name="birthdate" placeholder="Birthday" value={this.state.birthdate} onChange={this.changeHandler} />
            <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.changeHandler} />
            <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />
            <input type="text" name="password_confirmation" placeholder="Confirm Password" value={this.state.password_confirmation} onChange={this.changeHandler} />
            <input type="file" name="profile_picture" accept="image/*" onChange={this.pictureHandler} />
            {/* <input type="text" name="img_url" placeholder="Profil Picture URL" value={this.state.img_url} onChange={this.changeHandler} /> */}
            <input type="submit" value="Sign Up" />
          </form>
        </div >
      </div>
    )
  }
}