import React from 'react'
import '../Css/SearchForm.css'
import Search from '../Containers/Search'

export default class SearchForm extends React.Component {

    state = {
        search: ""
    }

    changeHandler = (e) => {
        e.persist()
        this.setState(() => ({ search: e.target.value }))
    }

    render() {
        return (
            <form id="search-bar">
                <input type="text" name="search" placeholder="Search..." value={this.state.search} onChange={this.changeHandler} />
            </form>
        )
    }
}