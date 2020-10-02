import React from 'react'
import { withRouter } from 'react-router-dom'
import '../Css/PostContent.css'
import img from "../Components/blank-profile-pic.png"


class PostContent extends React.Component {

    state = {
        imageCounter: 0
    }

    clickHandler = () => {
        localStorage.setItem("userId", this.props.post.user_id)
    }
    submit = (e) => {
        e.preventDefault()
        this.props.submitHandler()
    }

    showModal = () => {
        this.props.showOrHideModal(this.props.post.photos)
    }

    photoReel = () => {
        return <img className="post-photo" alt="" src={this.props.post.photos[this.state.imageCounter].img_url} onClick={this.showModal} />
    }

    photoArrows = () => {
        return (
            this.props.post.photos.length > 1 ?
                <div className="arrows">
                    {this.state.imageCounter > 0 ? <button onClick={() => this.setState((previousState) => ({ imageCounter: previousState.imageCounter - 1 }))}>Previous</button> : null}
                    {this.state.imageCounter < this.props.post.photos.length - 1 ? <button onClick={() => this.setState((previousState) => ({ imageCounter: previousState.imageCounter + 1 }))}>Next</button> : null}
                </div> :
                null
        )
    }

    render() {
        return (
            <>
                <div className="post-header">
                    <a href={`/profile/${this.props.post.user_id}`} >
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
                    {this.props.post.photos.length > 0 ?
                        <div className="photo-reel">
                            {this.photoArrows()}
                            {this.photoReel()}
                            {this.props.post.photos.length > 1 ? <span>{this.state.imageCounter + 1} / {this.props.post.photos.length}</span> : null}
                        </div>
                        : null}
                </div>
            </>
        )
    }
}

export default withRouter(PostContent)