import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleImageModal, toggleImageModalInUpdateNote } from '../../redux/slices/modalSlice'
import IconButton from '../IconButton/IconButton'
import NoteImage from '../NoteImage/NoteImage'
import './styles.css'

const ImagesContainer = ({ inHome = false }) => {

    const dispatch = useDispatch()
    let imagesContainer = useSelector(state => inHome ? state.modals.imageModal : state.modals.imageModalInUpdateNote)
    let hideContainer = { ...imagesContainer, isVisible: false }

    return (
        <div className={`dimBackground ${imagesContainer.isVisible && inHome ? 'visible' : ''}`}>

            <div className={`viewImagesContainer container ${!inHome ? 'inUpdateNote' : ''} ${imagesContainer.isVisible ? 'visible' : ''} position-absolute 
        shadow rounded-lg`}>
                <div className="viewImagesInner d-flex flex-column pb-3">
                    <div className="actionBar text-right">
                        {/* <h2 className="mt-4 ml-4">Images</h2> */}
                        <IconButton className="fa fa-times closeViewImageContainer p-2 m-1 rounded-circle" action={() => dispatch(
                            inHome ? toggleImageModal(hideContainer) : toggleImageModalInUpdateNote(hideContainer)
                        )} />
                    </div>
                    <div className="imagesContainer container d-flex flex-wrap justify-content-center p-2">
                        {
                            imagesContainer.isVisible &&
                            imagesContainer.images.map((image, index) =>
                                <NoteImage image={image} key={index} />
                            )
                        }
                    </div>
                </div>
            </div >
        </div >

    )
}

export default ImagesContainer