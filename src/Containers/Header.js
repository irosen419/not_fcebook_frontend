import React from 'react'
import '../Css/Header.css'
// import { Route, NavBar } from 'react-router-dom'
import SearchForm from '../Components/SearchForm'

export default function Header(props) {

    return (
        <div id="header">
            <SearchForm formClickHandler={props.formClickHandler} />
            <button onClick={props.appLogout}>Log Out</button>
        </div>
    )

}