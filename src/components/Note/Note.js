import React, { useState } from 'react'
import axios from 'axios'
import IconButton from '../IconButton/IconButton'
import Label from '../Label/Label'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNote } from '../../redux/slices/notesSlice'
import Actionbar from '../Actionbar/Actionbar'
import { toggleImageModal, toggleUpdateNoteModal } from '../../redux/slices/modalSlice'
import { motion } from "framer-motion"

const Note = ({ index, _id, title, content, labels, images, date, homeLabels, setHomeLabels, setSelectedId }) => {

    // eslint-disable-next-line
    const notes = useSelector(state => state.notes)
    const activeLabel = useSelector(state => state.modals.activeLabel)
    // eslint-disable-next-line
    const [isVisible, setVisibility] = useState(false)
    const [isRemoved, setRemoved] = useState(false)
    const dispatch = useDispatch()

    let isNoteFiltered = () => {
        if ((labels == null || (!labels.length && activeLabel !== 'All')) || (activeLabel !== 'All' && !labels[0].includes(activeLabel)))
            return 'hidden'
        return ''
    }

    const removeNote = (e) => {
        e.stopPropagation();
        axios.delete(`https://quick-notes-backend.onrender.com/api/notes/${_id}`)
            .then(response => {
                console.log(response, labels[0], labels)
                setRemoved(!isRemoved)
                setTimeout(() => dispatch(deleteNote({ id: _id })), 800)
                if (labels.length) {
                    let newLabels = homeLabels.filter(label => !labels[0].includes(label))
                    setHomeLabels(newLabels)
                }
            })
            .catch(error => console.log(error));
        console.log(notes)

    }

    const showImages = (e) => {
        e.stopPropagation()
        dispatch(toggleImageModal({ isVisible: true, images: images }))
    }

    return (
        <motion.div layoutId={_id} className={`note d-flex flex-column rounded-lg ${isVisible ? 'animateNote' : ''} ${isRemoved ? 'removeNote p-0' : 'mt-2'}
        ${isNoteFiltered()}`}
            style={{ "--order": `${index + 1}` }}
            onClick={() => dispatch(toggleUpdateNoteModal({ id: _id, title, content, labels, images }))}>

            <div className="d-flex justify-content-between align-items-center">

                <h3 className="title mb-0">{title}</h3>
                <Actionbar>
                    {
                        images && <IconButton className="fa fa-image rounded-circle" action={showImages} />
                    }
                    <i className="fa fa-times rounded-circle" onClick={removeNote}></i>
                </Actionbar>
            </div>

            <span className="creationDate ml-1">{date}</span>

            <span className="content mt-2 ml-1 mb-0">{content}</span>
            {
                labels
                &&
                labels.length > 0
                &&
                <div className="labels d-flex pb-1 align-items-center mt-2">
                    {
                        labels[0].split(',').map((label, key) => <Label key={key} index={index + 1}>{label}</Label>)
                    }
                </div>
            }
        </motion.div >
    )
}

export default Note