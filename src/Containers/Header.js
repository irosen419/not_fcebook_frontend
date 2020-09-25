import React from 'react'
import '../Css/Header.css'
// import { Route, NavBar } from 'react-router-dom'
import SearchForm from '../Components/SearchForm'

export default class Header extends React.Component {
    render() {
        return (
            <div id="header">
                <SearchForm />
            </div>
        )
    }
}