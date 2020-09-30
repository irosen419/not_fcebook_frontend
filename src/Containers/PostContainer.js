import React from 'react'
import '../Css/PostContainer.css'
import Post from '../Components/Post'

export default class PostContainer extends React.Component {

    componentDidMount() {
        this.renderPosts()
    }

    sortByDate = (array) => {
        return array.sort((a, b) => {
            if (a.created_at > b.created_at) return -1;
            if (a.created_at < b.created_at) return 1;
            return 0;
        });

    }

    renderPosts = () => {
        let posts = this.props.posts
        posts = this.sortByDate(posts)
        return posts.map(post =>
            <Post
                post={post}
                key={post.id}
                deletePost={this.props.deletePost}
                user={this.props.user}
                edit={this.props.edit}
                changeHandler={this.props.changeHandler}
                submitHandler={this.props.submitHandler}
                editContent={this.props.editContent}
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