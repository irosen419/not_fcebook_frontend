import React from 'react'

export default class TestFetch extends React.Component {

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


  clickHandler = () => {
  
  }






  render(){
    return <button onClick={this.clickHandler} >T E S T</button>
  }

}