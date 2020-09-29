import React from 'react'
import { withRouter } from 'react-router-dom'

function InfoCard(props) {

    const nonUserId = parseInt(localStorage.getItem("userId"))
    const following = () => {
        return props.currentUserFollowing.find(user => user.id === nonUserId)
    }
    return (
        <div className="info-card">
            { nonUserId !== props.user.id ? < button onClick={props.follow }>{following ? 'Unfollow' : 'Follow'}</button > : null }
        </div >
    )
}

export default withRouter(InfoCard)