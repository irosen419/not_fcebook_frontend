import React from 'react'
import { withRouter } from 'react-router-dom'

function InfoCard(props) {
    // console.log("CurrentUserFollowing: ", props.currentUserFollowing)
    const nonUserId = parseInt(localStorage.getItem("userId"))
    const following = () => {
        return props.currentUserFollowing.find(user => user.id === nonUserId)
    }
    return (
        <div id="info-card">
            <div id="about-and-follow">
                <h3>About {props.user.first_name}</h3>
                {nonUserId !== props.user.id ? <button id="follow-button" onClick={props.followOrUnfollow}>{following() ? 'Unfollow' : 'Follow'}</button > : null}
            </div>
            <div id="user-info">
                <h4>Contact</h4>
                <p>email: {props.user.email}</p>
                <h4>Birthday</h4>
                <p>{props.user.birthdate}</p>
            </div>
        </div >
    )
}

export default withRouter(InfoCard)