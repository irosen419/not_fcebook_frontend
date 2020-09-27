import React from 'react'
import '../Css/Post.css'
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import CommentContainer from '../Containers/CommentContainer'
import Like from './Like'

export default class Post extends React.Component {

    state = {
        post: this.props.post,
        liked: false
    }

    postAddLike = (like) => {
        this.postLikeFetch(like)
    }

    postLikeFetch = (newLike) => {
        console.log("New Like: ", newLike)
        const configObj = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.props.token}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({ post_like: newLike })
        }
        fetch(`http://localhost:3000/api/v1/posts/${newLike.post_id}/like`, configObj)
            .then(resp => resp.json())
            .then(post => this.setState(() => ({
                post: post.post,
                liked: true
            })))
        // Returns the post Obj with all associated likes and comments
    }

    postRemoveLike = (like) => {
        this.postUnlikeFetch(this.state.post, like)
    }

    postUnlikeFetch = (postObj, likeObj) => {
        const foundPostLike = postObj.post_likes.find(like => like.user_id === likeObj.user_id)
        const configObj = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.props.token}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
            // body: {NO BODY}
        }
        fetch(`http://localhost:3000/api/v1/posts/${foundPostLike.post_id}/unlike/${foundPostLike.id}`, configObj)
            .then(resp => resp.json())
            .then(post => this.setState(() => ({
                post: post.post,
                liked: false
            })))
        // Returns the post Obj with all associated likes and comments (not with the delete post_like)
    }

    render() {
        console.log("Likes: ", this.props.post)
        return (
            <div className="post">
                <PostHeader post={this.state.post} />
                <PostContent content={this.state.post.content} />
                <Like userId={this.props.userId} post={this.state.post} liked={this.state.liked} token={this.props.token} likeNum={this.state.post.post_likes.length} postAddLike={this.postAddLike} postRemoveLike={this.postRemoveLike} />
                <CommentContainer userId={this.props.userId} token={this.props.token} post={this.state.post} />
            </div>
        )
    }
}