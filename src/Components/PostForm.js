import React from 'react'
import '../Css/PostForm.css'


export default class PostForm extends React.Component {

    state = {
        content: ""
    }

    changeHanlder = (e) => {
        e.persist()
        this.setState(() => ({ content: e.target.value }))
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.formSubmitHandler(this.state)
        this.setState(() => ({ content: "" }))
    }

    render() {
        return (
            <form id="post-form" onSubmit={this.submitHandler}>
                <div id="inner-form">
                    <input type="text" name="content" value={this.state.content} onChange={this.changeHanlder} />
                    <input type="submit" value="Post" />
                </div>
            </form>
        )
    }
}