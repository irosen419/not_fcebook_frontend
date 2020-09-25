import React from 'react'
import '../Css/PostForm.css'


export default class PostForm extends React.Component {

    state = {
        post: ""
    }

    changeHanlder = (e) => {
        e.persist()
        this.setState(() => ({ post: e.target.value }))
    }

    render() {
        return (
            <form id="post-form">
                <div id="inner-form">
                    <input type="text" name="post" value={this.setState.post} onChange={this.changeHanlder} />
                    <input type="submit" value="Post" />
                </div>
            </form>
        )
    }
}