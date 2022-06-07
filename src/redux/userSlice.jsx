import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";

// 유저 정보를 가져오는 Thunk (Read)
export const fetchUsers = createAsyncThunk('todos/fetchUsers', async() => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/')
    return response.data;
})


export const userSlice = createSlice({
    name: 'user', 
    initialState: {
        lists:[],
        loading: false,
        error: null,
    },
    reducers:{},
    extraReducers: builder =>{
        builder.addCase(fetchUsers.pending, state => {
            state.loading = true;
        })
        builder.addCase(fetchUsers.fulfilled, (state, action)=>{
            state.loading = false;
            state.users = action.payload;
            state.error = null;
        })
        builder.addCase(fetchUsers.rejected, (state, action)=>{
            state.loading = false;
            state.users = [];
            state.error = action.error.message;
        })
    }
    // extraReducers: {
    //     [fetchUsers.fulfilled]: (state, {payload}) => [...payload]
    // }
})


export default userSlice.reducer;
