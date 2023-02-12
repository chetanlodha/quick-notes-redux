import React, { useState, createRef } from 'react'
import axios from 'axios'
import "./styles.css"
import Actionbar from '../Actionbar/Actionbar'
import IconButton from '../IconButton/IconButton'
import LabelsContainer from '../LabelsContainer/LabelsContainer'
import Label from '../Label/Label'
import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'
import { useDispatch, useSelector } from 'react-redux'
import { addNote } from '../../redux/slices/notesSlice'
import { toggleCreateNote } from '../../redux/slices/modalSlice'
import Response from '../Response/Response'

const CreateNoteForm = ({ homeLabels, setHomeLabels }) => {

    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.id)
    const isVisible = useSelector(state => state.modals.createNote)
    const [isCreateLabelVisible, setCreateLabelVisibility] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [label, setLabel] = useState('')
    const [labels, setLabels] = useState([])
    const [response, setResponse] = useState({ isVisible: false, text: '', success: false })
    const imageRef = createRef()


    const appendNote = (e) => {
        const labelSelector = document.querySelectorAll('.createNoteFormContainer .label span');
        const formData = new FormData(document.querySelector('.createNoteForm'));
        const labels = [];
        if (labelSelector.length) {
            labelSelector.forEach(label => labels.push(label.textContent));
            formData.append('labels', labels);
        }
        axios.post(`https://quick-notes-backend.onrender.com/api/notes/create/${userId}`, formData)
            .then(res => {
                console.log(res.data);
                dispatch(addNote(res.data))
                setHomeLabels([...homeLabels, ...labels])
                handleResponse('Note created')
            })
            .catch(error => handleResponse(error.response.data))
    }

    const handleResponse = (res) => {
        let notification = {
            isVisible: true,
            text: res,
            success: true
        }
        if (res !== 'Note created')
            notification.success = false
        setResponse(notification)
        setTimeout(() => setResponse({ ...notification, isVisible: false }), 3000)
    }

    const appendLabel = (e) => {
        const newLabel = label
        if (newLabel === '' || labels.includes(newLabel))
            return
        setLabels([...labels, newLabel])
        setLabel('')
    }

    const removeLabel = (e) => {
        const value = e.target.parentNode.previousSibling.textContent
        setLabels(labels.filter(labelValue => labelValue !== value))
    }

    const closeCreateNote = () => {
        resetForm()
        if (isCreateLabelVisible)
            setCreateLabelVisibility(false)
        dispatch(toggleCreateNote())
    }

    const resetForm = () => {
        setLabels([])
        setLabel('')
        setTitle('')
        setContent('')
        imageRef.current.value = ''
    }

    const onChange = (e) => {
        const value = e.target.value
        if (e.target.name === 'label')
            setLabel(value)
        else if (e.target.name === 'title')
            setTitle(value)
        else
            setContent(value)
    }

    return (
        <div className={`createNoteFormContainer ${isVisible ? 'visible' : ''} shadow rounded-lg`}>
            <div className="createNoteFormContainerInner container p-3 h-100 px-0">
                <Actionbar className="actionBar d-flex justify-content-end align-items-center">
                    <div className={`inputWithActionContainer ${isCreateLabelVisible ? 'visible' : 'hidden'} rounded-lg d-flex justify-content-between align-items-center mr-1`}>
                        <Input className="mb-0 " name="label" type="text" placeholder="Add label" onChange={onChange} value={label} />
                        <IconButton className="fa fa-plus-circle addLabelToNote rounded-circle p-2" hasCallback={true} action={appendLabel} />
                    </div>
                    <IconButton className="fa fa-tag rounded-circle" hasCallback={true} action={() => setCreateLabelVisibility(!isCreateLabelVisible)} />
                    <IconButton className="fa fa-image rounded-circle" hasCallback={true} action={() => imageRef.current.click()} />
                    {/* <img className="icon mx-2 mb-1" src="/public/assets/icons/add-image.svg" alt="Attach image to note" /> */}
                    <IconButton className="fa fa-check-circle rounded-circle" hasCallback={true} action={appendNote} />
                    <IconButton className="fa fa-times rounded-circle" hasCallback={true} action={closeCreateNote} />
                </Actionbar>
                <LabelsContainer className={`labels ${(labels.length > 0) ? 'pt-2 pb-1' : ''} d-flex align-items-center w-100`}>
                    {
                        labels
                        &&
                        labels.map((label, index) => <Label key={index} inCreateNote={true} removeLabel={removeLabel}>{label}</Label>)
                    }
                </LabelsContainer>
                <form className="createNoteForm d-flex flex-column" encType="multipart/form-data">

                    <Input
                        className="d-none"
                        type="file"
                        accept="image/*"
                        name="images"
                        reference={imageRef}
                        multiple={true} />

                    <Input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className={`${!labels.length ? 'mt-2' : ''} mb-2`}
                        onChange={onChange}
                        value={title}
                        required={true} />

                    <Textarea name="content" cols="30" rows={(labels.length > 0) ? '12' : '13'}
                        placeholder="Starting writing..."
                        className="mb-0"
                        onChange={onChange}
                        value={content}
                        required={true} />

                </form>
                <Response response={response} />
            </div>
        </div>
    )
}

export default CreateNoteForm