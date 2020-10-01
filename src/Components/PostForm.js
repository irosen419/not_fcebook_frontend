import React from 'react'
import '../Css/PostForm.css'


export default function PostForm(props) {

    const submit = (e) => {
        e.preventDefault()
        props.submitHandler()
    }

    const renderPreview = () => {
        return props.preview.map(photo => <img key={""} className="preview" alt="" src={photo} /> )
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
                <div id="preview-div">
                    {props.preview.length > 0 ? renderPreview() : null}
                </div>
                <input 
                    type="file"
                    multiple
                    name="post_photo" 
                    accept="image/*" 
                    onChange={props.pictureHandler}
                />
                <input type="submit" value="Post" />
            </div>
        </form>
    )

}