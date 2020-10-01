import React from 'react'
import { withRouter } from 'react-router-dom'
import '../Css/PostContent.css'
import img from "../Components/blank-profile-pic.png"


class PostContent extends React.Component {

    clickHandler = () => {
        localStorage.setItem("userId", this.props.post.user_id)
    }
    submit = (e) => {
        e.preventDefault()
        this.props.submitHandler()
    }


    render() {
        console.log("Post Props: ", this.props.post)
        return (
            <>
                <div className="post-header">
                    <a href={`http://localhost:3001/profile/${this.props.post.user_id}`} >
                        {this.props.post.post_user_url ?
                            <img id="post" alt="" src={this.props.post.post_user_url} /> :
                            <img id="post" alt="Alt" src={img} />
                        }
                        <h3 onClick={this.clickHandler}>
                            {this.props.post.user_name}
                        </h3>
                    </a>
                    {this.props.post.time}
                </div>
                <div className="post-content">
                    {this.props.post.photos.length > 0 ?
                        <img className="post-photo" alt="" src={this.props.post.photos[0].img_url} /> 
                        : null}
                    {!this.props.clicked ?
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
                        </div>}
                </div>
            </>
        )
    }
}

export default withRouter(PostContent)