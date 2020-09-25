import React from 'react';
import { NavBar, Route } from 'react-router-dom'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import './App.css';
import TestFetch from './Components/TestFetch';

export default class App extends React.Component {

  state = {
    
  }
  
  appLoginHandler = (userInfo) => {
    const configObj = {
      method: 'POST', 
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"}, 
      body: JSON.stringify({user: userInfo})
    }
    fetch('http://localhost:3000/api/v1/login', configObj)
      .then(resp => resp.json())
      .then(console.log)
  }
  appSignupHandler = (userInfo) => {
    const configObj = {
      method: 'POST', 
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"}, 
      body: JSON.stringify({user: userInfo})
    }
    fetch('http://localhost:3000/api/v1/users', configObj)
      .then(resp => resp.json())
      .then(console.log)
  }


  
  render(){
    return(
      <div id="app-container">
        Hello World
        <SignUp appSignupHandler={this.appSignupHandler}/>
        <Login appLoginHandler={this.appLoginHandler}/>
        <br/>
        <TestFetch />
      </div>
    ) 
  }

  
}


