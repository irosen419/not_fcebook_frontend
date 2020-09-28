import React from 'react'
import { withRouter } from 'react-router-dom'
import Post from '../Components/Post'
import '../Css/Home.css'
import '../Css/Post.css'

class Home extends React.Component {

    sortByDate = (array) => {
        return array.sort((a, b) => {
            if (a.created_at > b.created_at) return -1;
            if (a.created_at < b.created_at) return 1;
            return 0;
        });

    }

    renderFollowingsPosts = () => {
        let arrayOfPosts = this.props.followingArray.map(user => user.posts).flat()
        arrayOfPosts = this.sortByDate(arrayOfPosts)
        return arrayOfPosts.map(post => <Post key={post.id} user={this.props.user} post={post} />)
    }

    render() {
        return (
            <div id="home" >
                {this.props.followingArray.length > 0 ? this.renderFollowingsPosts() : <h2>LOADING...</h2>}
            </div>
        )
    }
}

export default withRouter(Home)