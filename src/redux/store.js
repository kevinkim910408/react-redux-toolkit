import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import userSlice from "./userSlice";
import postsSliceTwo from './postSliceTwo'

export const store = configureStore({
    reducer:{
       posts: postSlice, // 바닐라 리덕스 툴킷
       user: userSlice, // axios 쳥크 리덕스 툴킷
       postsTwo: postsSliceTwo, // firestore 쳥크 리덕스 툴킷
    },

})
