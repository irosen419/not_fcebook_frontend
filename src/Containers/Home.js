import React from 'react'
import { withRouter } from 'react-router-dom'
import Post from '../Components/Post'
import PostForm from '../Components/PostForm'
import '../Css/Home.css'
import '../Css/Post.css'

class Home extends React.Component {

    sortByDate = (array) => {
        return array.sort((a, b) => {
            console.log("A: ", a.created_at, "B: ", b.created_at)
            if (a.created_at > b.created_at) return -1;
            if (a.created_at < b.created_at) return 1;
            return 0;
        });

    }
    postEditor = () => {
        this.props.submitHandler()
        this.setState((previousState) => ({ postEditor: !previousState.postEditor }))
    }

    renderFollowingsPosts = () => {
        let arrayOfPosts = this.props.followingArray.map(user => user.posts).flat()
        arrayOfPosts = arrayOfPosts.concat(this.props.currentUserPosts)
        console.log(arrayOfPosts)
        arrayOfPosts = this.sortByDate(arrayOfPosts)
        return arrayOfPosts.map(post =>
            <Post
                post={post}
                key={post.id}
                changeHandler={this.props.changeHandler}
                submitHandler={this.props.submitHandler}
                editContent={this.props.editContent}
                edit={this.props.edit}
                user={this.props.user}
                deletePost={this.props.appDeletePost}
            />
        )
    }

    render() {
        return (
            <div id="home" >
                <PostForm
                    content={this.props.content}
                    changeHandler={this.props.changeHandler}
                    submitHandler={this.props.submitHandler}
                />
                {this.props.currentUserPosts.length > 0 || this.props.followingArray.length > 0 ? this.renderFollowingsPosts() : <h4>You need to create some posts or follow some users before you can see anything here...</h4>}
            </div>
        )
    }
}

export default withRouter(Home)