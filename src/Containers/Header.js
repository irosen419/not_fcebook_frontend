import React from 'react'
import '../Css/Header.css'
import { Link, withRouter } from 'react-router-dom'
import SearchForm from '../Components/SearchForm'


function clickHandler(e, props) {
    // console.log(props)
    localStorage.setItem("userId", props.user.id)
}

function Header(props) {

    return (
        <div id="header">
            <Link to={'/home'}><button id="home-button">not Facebook</button></Link>
            <SearchForm formClickHandler={props.formClickHandler} />
            <Link to={`/profile/${props.user.id}`}><button id="profile-button" onClick={(e) => clickHandler(e, props)}>My Profile</button></Link>
            <button id="logout-button" onClick={props.appLogout}>Log Out</button>
        </div>
    )

}

export default withRouter(Header)