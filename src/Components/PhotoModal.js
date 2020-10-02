import React from 'react'

export default class PhotoModal extends React.Component {

    state = {
        imageCounter: 0
    }

    mapPhotos = () => {
        return <img className="modal-image" alt="" src={this.props.photos[this.state.imageCounter].img_url} />
    }

    showModal = () => {
        this.props.showOrHideModal(this.props.post.photos)
    }

    photoArrows = () => {
        return (
            this.props.photos.length > 1 ?
                <div className="arrows">
                    <div id="inner-arrows">
                        {this.state.imageCounter > 0 ? <button id="previous" onClick={() => this.setState((previousState) => ({ imageCounter: previousState.imageCounter - 1 }))}>Previous</button> : null}
                        {this.state.imageCounter < this.props.photos.length - 1 ? <button id="next" onClick={() => this.setState((previousState) => ({ imageCounter: previousState.imageCounter + 1 }))}>Next</button> : null}
                        {this.moveCounter()}
                    </div>
                </div> :
                null
        )
    }

    moveCounter = () => {
        return this.props.photos.length > 1 ? <span id="fraction">{this.state.imageCounter + 1} / {this.props.photos.length}</span> : null
    }
    render() {
        return (
            <div id="photo-modal">
                {this.props.photos.length > 0 ?
                    this.photoArrows()
                    : null}
                <span className="close" onClick={() => this.props.showOrHideModal([])}>x</span>
                {this.mapPhotos()}
            </div>
        )
    }
}