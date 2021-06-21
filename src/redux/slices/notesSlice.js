import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotes: (state, action) => {
            state.notes = action.payload
        },
        addNote: (state, action) => {
            // console.log(current(state.notes))
            state.notes = [action.payload, ...state.notes ]
        },
        updateNote: (state, action) => {
            state.notes = state.notes.map(note => (note._id === action.payload.id) ?
                Object.assign({}, note, {
                    title: action.payload.title,
                    content: action.payload.content
                }) : note
            )
            // console.log(state.notes)
        },
        deleteNote: (state, action) => {
            state.notes = state.notes.filter(note => note._id !== action.payload.id)
        }
    }
})

export const { setNotes, addNote, updateNote, deleteNote } = notesSlice.actions

export default notesSlice.reducer