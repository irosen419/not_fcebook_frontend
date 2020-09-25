import React from 'react'
import '../Css/SearchForm.css'
import Search from '../Containers/Search'

export default class SearchForm extends React.Component {
    render() {
        return (
            <form id="search-bar">
                <input type="text" name="search" value="SearchBar" />
            </form>
        )
    }
}