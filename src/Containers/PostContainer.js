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
        // console.log("Container Posts: ", this.props.posts)
        let posts = this.props.posts
        posts = this.sortByDate(posts)
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