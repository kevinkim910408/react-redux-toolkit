import { db } from "../firebase";
//순서대로 원하는db선택하기(콜렉션),수정할 document가져오기, 하나 가져오기, 여러개 가져오기, 추가하기, 수정하기  firebase
import {
  collection,
  addDoc,
  getDocs,

} from "firebase/firestore";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// 액션 타입
const ADD_USER = 'user/ADD_USER'
const LOAD_USER = 'user/LOAD_USER'

// 추가 기능
export const addUsers = createAsyncThunk(ADD_USER, async(payload) => {
    const data = await addDoc(collection(db, "newUser"), payload); 
    const data_obj = {id: data.id, ...payload}
    return data_obj;
})

// 불러오기 기능
export const loadUsers = createAsyncThunk(LOAD_USER, async()=>{
    const datas = await getDocs(collection(db, "newUser"));
    const data_list = [];
    datas.forEach((doc)=>{
        data_list.push({id: doc.id, ...doc.data()});
    });
    return data_list;
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
        // 추가
        builder.addCase(addUsers.pending, state => {
            state.loading = true;
        })
        builder.addCase(addUsers.fulfilled, (state, action)=>{
            state.loading = false;
            state.lists.push(action.payload);
            state.error = null;
        })
        builder.addCase(addUsers.rejected, (state, action)=>{
            state.loading = false;
            state.users = [];
            state.error = action.error.message;
        })
        // 불러오기
        builder.addCase(loadUsers.pending, state => {
            state.loading = true;
        })
        builder.addCase(loadUsers.fulfilled, (state, action)=>{
            state.loading = false;
            state.lists = action.payload;
            state.error = null;
        })
        builder.addCase(loadUsers.rejected, (state, action)=>{
            state.loading = false;
            state.users = [];
            state.error = action.error.message;
        })
    }
})


export default postsSliceTwo.reducer;