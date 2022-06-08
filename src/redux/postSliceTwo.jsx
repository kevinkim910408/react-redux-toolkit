import { db } from "../firebase";
//순서대로 원하는db선택하기(콜렉션),수정할 document가져오기, 하나 가져오기, 여러개 가져오기, 추가하기, 수정하기  firebase
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// 액션 타입
const ADD_USER = 'user/ADD_USER'
const LOAD_USER = 'user/LOAD_USER'
const DELETE_USER = 'user/DELETE_USER'
const UPDATE_USER = 'user/UPDATE_USER'

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

// 삭제 기능
export const deleteUser = createAsyncThunk(DELETE_USER, async(payload)=>{
    const data = doc(db, "newUser", payload.id);
    await deleteDoc(data);
    return payload.uid;
})

// 수정 기능
export const updateUser = createAsyncThunk(UPDATE_USER, async(payload)=>{
    const data = doc(db, "newUser", payload.id);
    await updateDoc(data, {
        title: payload.title,
        description: payload.description
    });
    return payload;
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
            state.lists = [];
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
            state.lists = [];
            state.error = action.error.message;
        })
        // 삭제
        builder.addCase(deleteUser.pending, state => {
            state.loading = true;
        })
        builder.addCase(deleteUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.lists = state.lists.filter(value=>{
                return value.uid !== action.payload
            })
            state.error = null;
        })
        builder.addCase(deleteUser.rejected, (state, action)=>{
            state.loading = false;
            state.lists = [];
            state.error = action.error.message;
        })
        // 수정
        builder.addCase(updateUser.pending, state => {
            state.loading = true;
        })
        builder.addCase(updateUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.lists.forEach((value)=>{
                if(value.uid === action.payload.uid){
                    value.title = action.payload.title;
                    value.description =action.payload.description;
                }
            })
            state.error = null;
        })
        builder.addCase(updateUser.rejected, (state, action)=>{
            state.loading = false;
            state.lists = [];
            state.error = action.error.message;
        })
        
    }
})


export default postsSliceTwo.reducer;