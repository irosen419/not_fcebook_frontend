import React from 'react'
import './Signup.css'

export default class SignUp extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    birthdate: "",
    img_url: "",
    email: "",
    password: "",
    password_confirmation: ""
  }

  signupHandler = (e) => {
    e.preventDefault()
    this.props.appSignupHandler(this.state)
    this.setState(() => ({
      first_name: "",
      last_name: "",
      birthdate: "",
      img_url: "",
      email: "",
      password: "",
      password_confirmation: ""
    }))
  }

  changeHandler = (e) => {
    e.persist()
    this.setState(() => ({
      [e.target.name]: e.target.value
    }))
  }

  clickHandler = () => {
    this.props.closeSignup()
  }

  render() {
    return (
      <div id="signup">
        <button class="close" onClick={this.clickHandler}>X</button>
        <form id="signup-form" onSubmit={this.signupHandler}>
          <input type="text" name="first_name" placeholder="First name" value={this.state.firstName} onChange={this.changeHandler} />
          <input type="text" name="last_name" placeholder="Last name" value={this.state.lastName} onChange={this.changeHandler} />
          <input type="date" name="birthdate" placeholder="DOB" value={this.state.birthdate} onChange={this.changeHandler} />
          <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.changeHandler} />
          <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />
          <input type="text" name="password_confirmation" placeholder="Confirm Password" value={this.state.password_confirmation} onChange={this.changeHandler} />
          <input type="text" name="img_url" placeholder="Profil Picture URL" value={this.state.img_url} onChange={this.changeHandler} />
          <input type="submit" value="Sign Up" />
        </form>
      </div >
    )
  }
}