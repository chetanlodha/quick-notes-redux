import React from 'react'
import './styles.css'
import CreateNoteForm from '../CreateNoteForm/CreateNoteForm'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCreateNote } from '../../redux/slices/modalSlice'
import DimBackground from '../Dimbackground/DimBackground'

const CreateNote = ({ homeLabels, setHomeLabels }) => {

    const dispatch = useDispatch()
    const isFormVisible = useSelector(state => state.modals.createNote)

    return (
        <>
            <div className="createNoteButton d-flex align-items-center rounded-circle shadow" onClick={() => dispatch(toggleCreateNote())}>
                < i className="fa fa-plus py-4 px-4" ></i >
            </div >
            <DimBackground isChildVisible={isFormVisible} toggleChild={toggleCreateNote} >
                <CreateNoteForm homeLabels={homeLabels} setHomeLabels={setHomeLabels} />
            </DimBackground>
        </>

    )
}

export default CreateNote