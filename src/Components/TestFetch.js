import React from 'react'

export default class TestFetch extends React.Component {

  postsUserFetch = (userId) => {
    const configObj = {
      method: 'GET', 
      headers: {
        'Authorization': 'Bearer <token>',
        'Content-Type': 'application/json', 
        'Accepts': 'application/json'},
      // body: {NO BODY}
    }
    fetch(`http://localhost:3000/api/v1/users/${userId}`, configObj)
    .then(resp=>resp.json())
    .then(console.log)
    // Returns all posts for the user who's ID is passed in with associated likes, comments.
  }

  postShowFetch = (postIDNum) => {
    const postID = postIDNum
    const configObj = {
      method: 'GET', 
      headers: {
        'Authorization': 'Bearer {this.state/props.token}',
        'Content-Type': 'application/json', 
        'Accepts': 'application/json'},
      // body: {NO BODY}
    }
    fetch(`http://localhost:3000/api/v1/posts/${postID}`, configObj)
    .then(resp=>resp.json())
    .then(console.log)
    // Returns specified Post with associated likes, comments and the UserName of whoever created it.
  }

  postCreateFetch = (newPostObj) => {
    const newPost = {
      content: newPostObj.content,
      user_id: "this.state.user.id??"
    }
    const configObj = {
      method: 'POST', 
      headers: {
        'Authorization': 'Bearer {this.state/props.token}',
        'Content-Type': 'application/json', 
        'Accepts': 'application/json'},
      body: JSON.stringify({post: newPost})
    }
    fetch(`http://localhost:3000/api/v1/posts/`, configObj)
    .then(resp=>resp.json())
    .then(console.log)
    // Returns new post.
  }

  postPatchFetch = (postObj) => {
    const newPost = {
      content: postObj.content,
      user_id: "this.state.user.id??"
    }
    const configObj = {
      method: 'PATCH', 
      headers: {
        'Authorization': 'Bearer {this.state/props.token}',
        'Content-Type': 'application/json', 
        'Accepts': 'application/json'},
      body: JSON.stringify({post: newPost})
    }
    fetch(`http://localhost:3000/api/v1/posts/${postObj.id}`, configObj)
    .then(resp=>resp.json())
    .then(console.log)
    // Returns updated post with associated likes, comments, and users full name.
  }

  postDeleteFetch = (postID) => {
    const configObj = {
      method: 'DELETE', 
      headers: {
        'Authorization': 'Bearer {this.state/props.token}',
        'Content-Type': 'application/json', 
        'Accepts': 'application/json'},
      // body: {NO BODY}
    }
    fetch(`http://localhost:3000/api/v1/posts/${postID}`, configObj)
    .then(resp=>resp.json())
    .then(console.log)
    // Returns an empty object.
  }

  postLikeFetch = (newLike) => {
    const testLike = {
      post_id: newLike.postID, 
      user_id: "this.state/props.user_id??"
    }
    const configObj = {
      method: 'POST', 
      headers: {
        'Authorization': 'Bearer {this.state/props.token}',
        'Content-Type': 'application/json', 
        'Accepts': 'application/json'},
      body: JSON.stringify({post_like: testLike})
    }
    fetch(`http://localhost:3000/api/v1/posts/${newLike.postID}/like`, configObj)
    .then(resp=>resp.json())
    .then(console.log)
    // Returns the post Obj with all associated likes and comments
  }

  postUnlikeFetch = (postObj) => {
    const foundPostLike = postObj.post_likes.find(like => like.user_id === "this.state/props.user_id")
    const configObj = {
      method: 'DELETE', 
      headers: {
        'Authorization': 'Bearer {this.state/props.token}',
        'Content-Type': 'application/json', 
        'Accepts': 'application/json'},
      // body: {NO BODY}
    }
    fetch(`http://localhost:3000/api/v1/posts/${foundPostLike.post_id}/unlike/${foundPostLike.id}`, configObj)
    .then(resp=>resp.json())
    .then(console.log)
    // Returns the post Obj with all associated likes and comments (not with the delete post_like)
  }

  ////////////// COMMENTS FETCH CALLS //////////////////////////////

  commentPostFetch = (commentObj) => {
    const newComment = {
      content: commentObj.content,
      user_id: "this.state/props.user_id",
      post_id: "this.state/props.post_id"
    }
    const configObj = {
      method: 'POST', 
      headers: {
        'Authorization': 'Bearer {this.state/props.token}',
        'Content-Type': 'application/json', 
        'Accepts': 'application/json'},
      body: JSON.stringify({comment: newComment})
    }
    fetch(`http://localhost:3000/api/v1/posts/${newComment.post_id}/comments/`, configObj)
    .then(resp=>resp.json())
    .then(console.log)
    // Returns single post with associated likes, and new comments.
  }

  commentPatchFetch = (commentObj) => {
    const updateComment = {
      content: commentObj.content
    }
    const configObj = {
      method: 'PATCH', 
      headers: {
        'Authorization': 'Bearer {this.state/props.token}',
        'Content-Type': 'application/json', 
        'Accepts': 'application/json'},
      body: JSON.stringify({comment: updateComment})
    }
    fetch(`http://localhost:3000/api/v1/posts/${commentObj.post_id}/comments/${commentObj.id}`, configObj)
    .then(resp=>resp.json())
    .then(console.log)
    // Returns the post with all comments include updated comment, and all likes.
  }

  commentDeleteFetch = (commentObj) => {
    const configObj = {
      method: 'DELETE', 
      headers: {
        'Authorization': 'Bearer {this.state/props.token}',
        'Content-Type': 'application/json', 
        'Accepts': 'application/json'},
      // body: JSON.stringify({comment: updateComment})
    }
    fetch(`http://localhost:3000/api/v1/posts/${commentObj.post_id}/comments/${commentObj.id}`, configObj)
    .then(resp=>resp.json())
    .then(console.log)
    // Returns the origianl post with comments and likes, with specified comment deleted.
  }

  commentLikeFetch =  (commentObj) => {
    const newCommentLike = {
      user_id: "this.state/props.user_id",
      comment_id: commentObj.id
    }
    const configObj = {
      method: 'POST', 
      headers: {
        'Authorization': 'Bearer {this.state/props.token}',
        'Content-Type': 'application/json', 
        'Accepts': 'application/json'},
      body: JSON.stringify({comment_like: newCommentLike})
    }
    fetch(`http://localhost:3000/api/v1/posts/${commentObj.post_id}/comments/${commentObj.id}/like`, configObj)
    .then(resp=>resp.json())
    .then(console.log)
    // Returns the comment that was liked, with all comment_likes associated with it.
  }

  commentUnlikeFetch = (commentObj) => {
    const foundCommentLike = commentObj.comment_likes.find(like => like.user_id === "this.state/props.user_id")
    const configObj = {
      method: 'DELETE', 
      headers: {
        'Authorization': 'Bearer {this.state/props.token}',
        'Content-Type': 'application/json', 
        'Accepts': 'application/json'},
      // body: JSON.stringify({comment_like: newCommentLike})
    }
    fetch(`http://localhost:3000/api/v1/posts/${commentObj.post_id}/comments/${commentObj.id}/unlike/${foundCommentLike.id}`, configObj)
    .then(resp=>resp.json())
    .then(console.log)
    // Returns the comment that was liked, with all comment_likes associated with it (minus the deleted one).
  }


  /////////////// USER FETCH CALLS W/FOLLOW FUNCTIONALITY //////////////


  follow = (currentUserId, followedUserId) => {
    const configObj = {
      method: 'POST', 
      headers: {
        'Authorization': 'Bearer {this.state/props.token}',
        'Content-Type': 'application/json', 
        'Accepts': 'application/json'},
      body: JSON.stringify({follow: {follower_id: currentUserId, followed_user_id: followedUserId}})
    }
    fetch(`http://localhost:3000/api/v1/users/${currentUserId}/follow`, configObj)
    .then(resp=>resp.json())
    .then(console.log)
    //Returns the current user with no followers or followings associations
  }

  unfollow = (currentUserId, followedUserId) => {
    const configObj = {
      method: 'POST', 
      headers: {
        'Authorization': 'Bearer {this.state/props.token}',
        'Content-Type': 'application/json', 
        'Accepts': 'application/json'},
      body: JSON.stringify({follow: {follower_id: currentUserId, followed_user_id: followedUserId}})
    }
    fetch(`http://localhost:3000/api/v1/users/${currentUserId}/unfollow`, configObj)
    .then(resp=>resp.json())
    .then(console.log)
    //Returns the current user with no followers or followings associations
  }

  getUsersFollowers = (currentUserId) => {
    const configObj = {
      method: 'GET', 
      headers: {
        'Authorization': 'Bearer {this.state/props.token}',
        'Content-Type': 'application/json', 
        'Accepts': 'application/json'},
      // body: {NO BODY}
    }
    fetch(`http://localhost:3000/api/v1/users/${currentUserId}/followers`, configObj)
    .then(resp=>resp.json())
    .then(console.log)
    // Returns an array of the current users FOLLOWERS
  }

  getUsersFollowings = (currentUserId) => {
    const configObj = {
      method: 'GET', 
      headers: {
        'Authorization': 'Bearer {this.state/props.token}', 
        'Accepts': 'application/json'},
      // body: {NO BODY}
    }
    fetch(`http://localhost:3000/api/v1/users/${currentUserId}/followings`, configObj)
    .then(resp=>resp.json())
    .then(console.log)
    // Returns an array of the current users FOLLOWINGS
  }


  clickHandler = (currentUserId) => {
    
  }






  render(){
    return <button onClick={this.clickHandler} >T E S T</button>
  }

}