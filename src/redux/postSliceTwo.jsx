import { db } from "../firebase";
//순서대로 원하는db선택하기(콜렉션),수정할 document가져오기, 하나 가져오기, 여러개 가져오기, 추가하기, 수정하기  firebase
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const ADD_USER = 'user/ADD_USER'

export const addUsers = createAsyncThunk(ADD_USER, async(payload) => {
    console.log(payload)
    const data = await addDoc(collection(db, "newUser"), payload); 
    return data
})


export const postsSliceTwo =createSlice({
    name: 'postTwo',
    initialState:{
        lists:[],
        loading: false,
        error: null,
    },
    reducers:{},
    extraReducers: builder =>{
        builder.addCase(addUsers.pending, state => {
            state.loading = true;
        })
        builder.addCase(addUsers.fulfilled, (state, action)=>{
            state.loading = false;
            state.users = action.payload;
            state.error = null;
        })
        builder.addCase(addUsers.rejected, (state, action)=>{
            state.loading = false;
            state.users = [];
            state.error = action.error.message;
        })
    }
})




export default postsSliceTwo.reducer;