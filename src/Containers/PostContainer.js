import React from 'react'
import '../Css/PostContainer.css'
import Post from '../Components/Post'

export default class PostContainer extends React.Component {

    componentDidMount() {
        this.renderPosts()
    }

    renderPosts = () => {
        let posts = this.props.posts
        return posts.map(post => 
            <Post 
                post={post}
                key={post.id} 
                user={this.props.user} 
                edit={this.props.edit}
                changeHandler={this.props.changeHandler}
                submitHandler={this.props.submitHandler}
                editContent={this.props.editContent}
                deletePost={this.props.deletePost}
            />
        )
    }

    render() {
        return (
            <div id="post-container">
                {this.renderPosts()}
            </div>
        )
    }
}