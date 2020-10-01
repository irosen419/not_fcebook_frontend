import React from 'react'
import '../Css/Header.css'
import { Link, withRouter } from 'react-router-dom'
import SearchForm from '../Components/SearchForm'



function Header(props) {

    const clickHandler = () => {
        localStorage.setItem("userId", props.user.id)
    }
    return (
        <div id="header">
            <Link to={'/home'}><button id="home-button">! facebook</button></Link>
            <SearchForm formClickHandler={props.formClickHandler} />
            <a href={`/profile/${props.user.id}`}>
                <img id="profile-button" onClick={clickHandler} alt="Alt" src={require("../Components/blank-profile-pic.png")} />
            </a>
            <button id="logout-button" onClick={props.appLogout}>Log Out</button>
        </div>
    )

}

export default withRouter(Header)