import React from 'react'
import { withRouter } from 'react-router-dom'

function InfoCard(props) {
    const nonUserId = parseInt(localStorage.getItem("userId"))
    const following = () => {
        return props.currentUserFollowing.find(user => user.id === nonUserId)
    }
    const friends = () => {
        return props.followingArray.map(user => {
            return  <a href={`http://localhost:3001/profile/${user.id}`} >
                <li>
                    {user.pic_url === "" ? 
                    <img id="friend-list-img" alt="" src="../blank-profile-pic.png" /> :
                    <img id="friend-list-img" alt="" src={user.img_url} />
                    }
                    {user.user_name}
                </li> 
            </a>
        })
    }

    return (
        <div id="info-card">
            <div id="about-and-follow">
                {props.user.img_url === "" ? 
                <img id="profile" alt="" src="../blank-profile-pic.png" /> :
                <img id="profile" alt="" src={props.user.img_url} />
                }
                <h3>About {props.user.first_name}</h3>
                {nonUserId !== props.user.id ? <button id="follow-button" onClick={props.followOrUnfollow}>{following() ? 'Unfollow' : 'Follow'}</button > : null}
            </div>
            <div id="user-info">
                <h4>Contact</h4>
                <p>email: {props.user.email}</p>
                <h4>Birthday</h4>
                <p>{props.user.birthday}</p>
            </div>
            <div>
                <h4>Friends</h4>
                <ul>{friends()}</ul>
            </div>
        </div >
    )
}

export default withRouter(InfoCard)