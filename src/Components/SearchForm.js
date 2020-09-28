import React from 'react'
import '../Css/SearchForm.css'
import { withRouter } from 'react-router-dom'
import Search from '../Containers/Search'

class SearchForm extends React.Component {

    state = {
        search: [],
        usersArray: [],
        suggestions: []
    }

    componentDidMount() {
        this.fetchUsers()
    }

    fetchUsers = () => {
        const configObj = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
            // body: {NO BODY}
        }

        fetch('http://localhost:3000/api/v1/users', configObj)
            .then(resp => resp.json())
            .then(users => this.setState(() => ({ usersArray: users })))
    }

    changeHandler = (e) => {
        e.persist()
        this.setState(() => ({ search: e.target.value }), () => {
            let listOfUsers = this.state.usersArray
            let suggestions = []
            if (this.state.search.length > 0) {
                suggestions = listOfUsers.filter(user => user.first_name.toLowerCase().includes(this.state.search.toLowerCase()) || user.last_name.toLowerCase().includes(this.state.search.toLowerCase()))
            }
            this.setState(() => ({ suggestions: suggestions }))
        })
    }

    clickHandler = (e, userId) => {
        localStorage.setItem("userId", userId)
        this.setState({ search: e.target.innerHTML })
        // this.props.formClickHandler(userId)
    }

    submitHandler = () => {
        this.props.history.push(`/profile/${localStorage.getItem("userId")}`)
    }

    mapUsers = () => {
        return this.state.suggestions.map(user => <li key={user.id} onClick={(e) => this.clickHandler(e, user.id)} onSubmit={this.submitHandler}>{`${user.first_name} ${user.last_name}`}</li>)
    }

    renderSuggestions = () => {
        const { suggestions } = this.state
        if (suggestions.length === 0) {
            return null
        } else {
            return (
                <ul>
                    {this.mapUsers()}
                </ul>
            )
        }
    }

    render() {
        return (
            <form id="search-bar">
                <input type="text" name="search" placeholder="Search..." value={this.state.search} onChange={this.changeHandler} />
                {this.renderSuggestions()}
            </form>
        )
    }
}

export default withRouter(SearchForm)