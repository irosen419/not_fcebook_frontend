import React from 'react'

export default function PhotoModal(props) {

    const mapPhotos = () => {
        return props.photos.map(photo => <img className="modal-image" alt={photo.id} src={photo.img_url} />)
    }

    return (
        <div id="photo-modal" onClick={() => props.showOrHideModal([])}>
            <span>x</span>
            {mapPhotos()}
        </div>
    )
}