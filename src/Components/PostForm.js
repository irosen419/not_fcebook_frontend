import React from 'react'
import '../Css/PostForm.css'


export default class PostForm extends React.Component {

    state = {
        photoInput: false
    }

    submit = (e) => {
        e.preventDefault()
        this.props.submitHandler()
        this.setState(() => ({ photoInput: false }))
    }

    togglePhotoInput = () => {
        this.setState((previousState) => ({ photoInput: !previousState.photoInput }))
    }

    showPhotoInput = () => {
        return (
            this.state.photoInput ?
                <input
                    type="file"
                    name="post_photo"
                    accept="image/*"
                    onChange={this.props.pictureHandler}
                /> :
                <button onClick={this.togglePhotoInput}>Add a photo!</button>
        )
    }

    render() {
        return (
            <form id="post-form" onSubmit={this.submit} >
                <div id="inner-form">
                    <input
                        type="text"
                        placeholder="New Post..."
                        name="content"
                        value={this.props.content}
                        onChange={this.props.changeHandler}
                    />
                    {this.showPhotoInput()}
                    <input type="submit" value="Post" />
                </div>
            </form>
        )
    }

}