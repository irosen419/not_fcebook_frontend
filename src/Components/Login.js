import React from 'react'

export default class Login extends React.Component {
    
    state = {
        email: "",
        password: ""
    }

    loginHandler = (e) => {
      e.preventDefault()
      this.props.appLoginHandler(this.state)
    }

    changeHandler = (e) => {
        e.persist()
        this.setState(()=>({
            [e.target.name]: e.target.value
        }))
    }
    
    render() {
        return(
        <div>
          <h2>Log In</h2>
          <form id="login-form" onSubmit={this.loginHandler}>
              <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.changeHandler} />
              <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />
              <input type="submit" value="Log In" />            
          </form>
        </div>
        )
    }
}