import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        lists:[]
    },
    reducers:{
        addPost: function(state, {type, payload}) {
            state.lists.push(payload);
        }
    }
})

export const {addPost} = postSlice.actions;

export default postSlice.reducer;