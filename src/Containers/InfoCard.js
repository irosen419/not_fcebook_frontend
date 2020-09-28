import React from 'react'
import { withRouter } from 'react-router-dom'


function following(props) {
    return props.currentUserFollowing.find(user => user.id == localStorage.getItem("userId"))
}

function InfoCard(props) {
    console.log(localStorage.getItem("userId"), props.user.id)
    return (
        <div className="info-card">
            { localStorage.getItem("userId") != props.user.id ? < button >{following(props) ? 'Unfollow' : 'Follow'}</button > : null}
        </div >
    )
}

export default withRouter(InfoCard)