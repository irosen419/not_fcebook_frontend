import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../Css/PostContent.css'


class PostContent extends React.Component {

    clickHandler = () => {
        localStorage.setItem("userId", this.props.post.user_id)
    }
    submit = (e) => {
        e.preventDefault()
        this.props.submitHandler()
    }


    render(){
        return (
            <>
                <div className="post-header">
                    <h3 onClick={this.clickHandler}>
                        Posted by 
                        <Link to={`/profile/${this.props.post.user_id}`} >
                            {this.props.post.user_name}
                        </Link>
                        at {this.props.post.created_at}
                    </h3>
                </div>
                <div className="post-content">
                    { !this.props.clicked ? 
                    this.props.post.content : 
                    <div>
                        <form onSubmit={this.submit}>
                            <input 
                                type="text" 
                                name="editContent"
                                value={this.props.editContent}
                                onChange={this.props.changeHandler}
                            />
                        </form>
                    </div> }
                </div>
            </>
        )
    }
}

export default withRouter(PostContent)