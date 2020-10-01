import React from 'react'
import { withRouter } from 'react-router-dom'
// import "../Components/blank-profile-pic.png"

function InfoCard(props) {
    const nonUserId = parseInt(localStorage.getItem("userId"))
    const following = () => {
        return props.currentUserFollowing.find(user => user.id === nonUserId)
    }
    const friends = () => {
        return props.followingArray.map(user => {
            return <a href={`http://localhost:3001/profile/${user.id}`} >
                <li>
                    {user.pic_url === "" ?
                        <img id="friend-list-img" alt="" src={require("../Components/blank-profile-pic.png")} /> :
                        <img id="friend-list-img" alt="" src={`http://localhost:3000${user.pic_url}`} />
                    }
                    {user.user_name}
                </li>
            </a>
        })
    }
    console.log("Non User: ", nonUserId, "Props User: ", props.user.id)
    return (
        <div id="info-card">
            <div id="about-and-follow">
                {props.user.pic_url === "" ?
                    <img id="profile" alt="" src={require("../Components/blank-profile-pic.png")} /> :
                    <img id="profile" alt="" src={`http://localhost:3000${props.user.pic_url}`} />
                }
                <h2>About {props.user.first_name}</h2>
                {nonUserId !== props.currentUser.id ? <button id="follow-button" onClick={props.followOrUnfollow}>{following() ? 'Unfollow' : 'Follow'}</button > : null}
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