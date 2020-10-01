import React from 'react'

export default function CommentForm(props) {

    const submit = (e) => {
        e.preventDefault()
        props.submitHandler()
    }

    return (
        <div className="comment-form" >
            <form onSubmit={submit} >
                <input
                    type="text"
                    placeholder="Add a comment..."
                    name="content"
                    value={props.content}
                    onChange={props.changeHandler}
                />
            </form>
        </div>
    )
}