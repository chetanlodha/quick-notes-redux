import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: '',
    name: '',
    email: '',
    token: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { id, name, email, token } = action.payload
            state.id = id
            state.name = name
            state.email = email
            state.token = token
        },
        removeUser: state => {
            state.id = state.name = state.email = state.token = ''
        }
    }
})

export const { addUser, removeUser } = userSlice.actions

export default userSlice.reducer