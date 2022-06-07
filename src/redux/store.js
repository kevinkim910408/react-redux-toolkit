import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import userSlice from "./userSlice";
import postsSliceTwo from './postSliceTwo'

export const store = configureStore({
    reducer:{
       posts: postSlice,
       user: userSlice,
       postsTwo: postsSliceTwo,
    },

})

