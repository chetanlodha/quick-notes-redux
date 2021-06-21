import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    welcomeMessage: true,
    profileCard: false,
    updateProfileModal: false,
    activeLabel: 'All',
    createNote: false,
    gridView: false,
    updateNoteModal: {
        id: '',
        title: '',
        content: '',
        labels: [],
        images: []
    },
    imageModal: {
        isVisible: false,
        images: []
    },
    imageModalInUpdateNote: {
        isVisible: false,
        images: []
    },
}

const modalSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        toggleWelcomeMessage: state => {
            state.welcomeMessage = !state.welcomeMessage
        },
        toggleProfileCard: state => {
            state.profileCard = !state.profileCard
        },
        toggleUpdateProfileModal: state => {
            state.updateProfileModal = !state.updateProfileModal
        },
        toggleActiveLabel: (state, action) => {
            console.log(action.payload)
            state.activeLabel = action.payload
        },
        toggleCreateNote: state => {
            state.createNote = !state.createNote
        },
        toggleGridView: state => {
            state.gridView = !state.gridView
        },
        toggleUpdateNoteModal: (state, action) => {
            state.updateNoteModal = { ...action.payload }
        },
        toggleImageModal: (state, action) => {
            state.imageModal = action.payload
        },
        toggleImageModalInUpdateNote: (state, action) => {
            state.imageModalInUpdateNote = action.payload
        }
    }
})

export const { toggleWelcomeMessage, toggleProfileCard, toggleUpdateProfileModal, toggleActiveLabel, toggleCreateNote, toggleGridView, 
    toggleUpdateNoteModal, toggleImageModal, toggleImageModalInUpdateNote } = modalSlice.actions

export default modalSlice.reducer
