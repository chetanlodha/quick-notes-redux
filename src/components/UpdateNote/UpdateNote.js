import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { toggleImageModalInUpdateNote, toggleUpdateNoteModal } from '../../redux/slices/modalSlice'
import Actionbar from '../Actionbar/Actionbar'
import LabelsContainer from '../LabelsContainer/LabelsContainer'
import Label from '../Label/Label'
import IconButton from '../IconButton/IconButton'
import { updateNote } from '../../redux/slices/notesSlice'
import "./styles.css"
import ImagesContainer from '../ImagesContainer/ImagesContainer'
import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'
import Response from '../Response/Response'
import DimBackground from '../Dimbackground/DimBackground'
import { motion } from 'framer-motion'


const UpdateNote = ({setSelectedId}) => {

    const dispatch = useDispatch()
    const currentNote = useSelector(state => state.modals.updateNoteModal)
    const imagesContainer = useSelector(state => state.modals.imageModalInUpdateNote)

    // const notes = useSelector(state => state.notes)
    const { id, title, content, labels, images } = currentNote
    const titleRef = useRef(null)
    const contentRef = useRef(null)
    const [formTitle, setFormTitle] = useState('')
    const [formContent, setFormContent] = useState('')
    const [response, setResponse] = useState({ isVisible: false, text: '', success: false })

    const saveNote = () => {
        const data = {
            title: titleRef.current.value,
            content: contentRef.current.value
        }
        axios.post(`https://quick-notes-backend.onrender.com/api/notes/update/${id}`, data)
            .then(res => {
                handleResponse(res.data)
                dispatch(updateNote({ id: id, title: data.title, content: data.content }))
            })
            .catch(error => handleResponse(error.response.data))
    }


    const handleResponse = (res) => {
        let notification = {
            isVisible: true,
            text: res,
            success: true
        }
        if (res !== 'Note updated')
            notification.success = false
        setResponse(notification)
        setTimeout(() => setResponse({ ...notification, isVisible: false }), 3000)
    }

    const onChange = (e) => {
        const value = e.target.value
        if (e.target.name === 'title')
            setFormTitle(value)
        else
            setFormContent(value)
    }

    const resetForm = () => {
        setFormTitle('')
        setFormContent('')
    }

    const closeUpdateNote = () => {
        resetForm()
        dispatch(toggleUpdateNoteModal({ id: null, title: '', content: '', labels: [], images: [] }))
    }

    useEffect(() => {
        if (formTitle === '') {
            setFormTitle(title)
            setFormContent(content)
        } else {
            setFormTitle(formTitle)
            setFormContent(formContent)
        }
    }, [title, content, formTitle, formContent])

    return (
        <DimBackground isChildVisible={id !== ''} toggleChild={closeUpdateNote}>
            <motion.section layoutId={id} className={`updateNoteContainer ${(id !== '') ? 'visible' : ''} container position-absolute shadow rounded-lg`}>
                <div  className={`updateNoteContainerInner ${imagesContainer.isVisible ? 'hidden' : ''} container d-flex flex-column pb-3 px-0`}>
                    {console.log(id)}
                    <Actionbar className="actionBar d-flex flex-column flex-md-row justify-content-between">
                        <LabelsContainer className='labels d-flex flex-row-reverse justify-content-end flex-wrap flex-shrink-1 
                        align-items-center py-2 order-2 order-md-1'>
                            {
                                labels
                                &&
                                labels.length > 0
                                &&
                                labels[0].split(',').map((label, index) => <Label key={index}>{label}</Label>)
                            }
                        </LabelsContainer>
                        <div className="d-flex justify-content-end justify-content-md-center align-items-center order-1 order-md-2">
                            {
                                images &&
                                <IconButton className="fa fa-image rounded-circle" hasCallback={true} action={() => dispatch(toggleImageModalInUpdateNote({ isVisible: true, images: images }))} />
                            }
                            <IconButton className="fa fa-check-circle p-2 m-1 rounded-circle" hasCallback={true} action={saveNote} />
                            <IconButton className="fa fa-times p-2 m-1 rounded-circle" hasCallback={true} action={closeUpdateNote} />
                        </div>
                    </Actionbar>
                    <form className="updateNoteForm d-flex flex-column">
                        <Input type="text" name="title" placeholder="Title" className="mb-2"
                            value={formTitle} onChange={onChange} reference={titleRef} required={true} />
                        {/* <textarea name="content" className="mt-0" cols="30" rows="13"
                            placeholder="Starting writing..." value={formContent} onChange={onChange} ref={contentRef} required /> */}
                        <Textarea name="content" className="mb-0" cols="30" rows="13"
                            placeholder="Starting writing..." value={formContent} onChange={onChange} reference={contentRef} required />
                    </form>
                </div>
                <ImagesContainer />
                <Response response={response} />
            </motion.section>
        </DimBackground>
    )
}

export default UpdateNote