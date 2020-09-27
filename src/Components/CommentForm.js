import React from 'react'

export default class CommentForm extends React.Component {

    state = {
        content: ""
    }

    changeHandler = (e) => {
        e.persist()
        this.setState(() => ({ content: e.target.value }))
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.commentSubmitHandler(this.state)
        this.setState(() => ({ content: "" }))
    }

    render() {
        return (
            <div className="comment-form" onSubmit={this.submitHandler}>
                <form>
                    <input type="textarea" name="content" value={this.state.content} onChange={this.changeHandler} />
                </form>
            </div>
        )
    }
}