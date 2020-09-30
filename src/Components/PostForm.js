import React from 'react'
import '../Css/PostForm.css'


export default function PostForm(props) {

    const submit = (e) => {
        e.preventDefault()
        props.submitHandler()
        if (props.postEditor) {
            props.postEditor()
        }
    }

    return (
        <form id="post-form" onSubmit={submit}>
            <div id="inner-form">
                <input
                    type="text"
                    placeholder="New Post..."
                    name="content"
                    value={props.content}
                    onChange={props.changeHandler}
                />
                <input type="submit" value="Post" />
            </div>
        </form>
    )

}