import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../Shared/api'

const ADD_USER = 'post/ADD_USER'
const LOAD_USER = 'post/LOAD_USER'
const DELETE_USER = 'post/DELETE_USER'
const UPDATE_USER = 'post/UPDATE_USER'

export const loadUsers = createAsyncThunk(LOAD_USER, async()=> {
    const data = await api.get("/posts")
    console.log(data)
    return data;
})

export const postSliceThree = createSlice({
    name: 'postThree',
    initialState:{
        lists:[],
        loading: false,
        error: null,
    },
    reducers:{},
    extraReducers:{
        [loadUsers.fulfilled]: (state, { payload }) => {state.lists = payload; state.loading = false; state.error = null},
        [loadUsers.pending]: (state) => {state.loading = true},
        [loadUsers.rejected]: (state, action) => {state.error = action.error.message; state.loading = false;},
    }
})

export default postSliceThree.reducer;