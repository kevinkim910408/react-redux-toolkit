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
const ADD_USER = 'post/ADD_USER'
const LOAD_USER = 'post/LOAD_USER'
const DELETE_USER = 'post/DELETE_USER'
const UPDATE_USER = 'post/UPDATE_USER'

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


// 리듀서
export const postsSliceTwo =createSlice({
    name: 'postTwo',
    initialState:{
        lists:[],
        loading: false,
        error: null,
    },
    // 일반 리듀서는 안쓴다.
    reducers:{},
     //extra reducer = middleware
    // extraReducers:{
    //     [loadUsers.fulfilled]: (state, { payload }) => {state.lists = payload; state.loading = false; state.error = null},
    //     [loadUsers.pending]: (state) => {state.loading = true},
    //     [loadUsers.rejected]: (state, action) => {state.error = action.error.message; state.loading = false;},
    // }
    extraReducers: builder =>{
        // 추가
        builder.addCase(addUsers.pending, state => { // 로딩 = pending
            state.loading = true;
        })
        builder.addCase(addUsers.fulfilled, (state, action)=>{ // 값에 직접적 영향 = fulfilled
            state.loading = false;
            state.lists.push(action.payload);
            state.error = null;
        })
        builder.addCase(addUsers.rejected, (state, action)=>{ // 에러 = rejected
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
            // 삭제 로직- 한 페이지에서 진행하다보니, 각 게시글마다 uid를 먹여서 그거 대로 삭제
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
            // 수정 로직 - value로 날아온 값중에 uid 같으면 데이터 변경해줌
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