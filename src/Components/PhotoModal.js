import React from 'react'

export default function PhotoModal(props) {

    const mapPhotos = () => {
        return props.photos.map(photo => <img alt={photo.id} src={photo.img_url} />)
    }

    return (
        <div id="photo-modal">
            <span onClick={() => props.showOrHideModal([])}>x</span>
            {mapPhotos()}
        </div>
    )
}