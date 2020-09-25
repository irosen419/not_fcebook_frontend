import React from 'react'
import '../Css/Profile.css'
import { Route, NavBar } from 'react-router-dom'
import PostForm from '../Components/PostForm'
import PostContainer from '../Containers/PostContainer'

export default class Profile extends React.Component {
    render() {
        return (
            <div id="profile">
                <PostForm />
                <PostContainer />
            </div>
        )
    }
}