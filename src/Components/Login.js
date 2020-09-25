import React from 'react'
// import { Route, NavBar } from 'react-router-dom'
import '../Css/Login.css'

export default class Login extends React.Component {

    state = {
        email: "",
        password: ""
    }

    loginHandler = (e) => {
        e.preventDefault()
        if (this.state.email && this.state.password) {
            this.props.appLoginHandler(this.state)
            this.setState(() => ({
                email: "",
                password: ""
            }))
        }
    }

    changeHandler = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    clickHandler = () => {
        this.props.displayHandler()
    }

    render() {
        return (
            <div id="login">
                <form id="login-form" onSubmit={this.loginHandler}>
                    <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.changeHandler} />
                    <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />
                    <input type="submit" value="Log In" />
                </form>
                <div id="not-a-member">
                    <p>Not a member?</p>
                    <button id="signup-from-login" onClick={this.clickHandler}>Sign Up</button>
                </div>
            </div>
        )
    }
}