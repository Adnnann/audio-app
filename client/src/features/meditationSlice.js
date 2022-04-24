import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    file:''
}

export const meditationSlice = createSlice({
    name:'meditation',
    initialState,
    reducers:{
        setFile:(state, action) => {
            state.file = action.payload
        }
    },
})

export const {
    setFile
} = meditationSlice.actions

export const getFile = (state) => state.meditation.file

export default meditationSlice.reducer