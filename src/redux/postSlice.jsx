import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        lists:[],
        loading: false,
        error: null,
    },
    reducers:{
        // add action
        addPost: function(state, {type, payload}) {
            state.lists.push(payload);
        },
        // delete action
        deletePost: function(state, {type, payload}){
            // console.log(payload)  // 항상 뭐가 이상하다 싶으면 이렇게 console을 찍자!
            // 아래는 받아온 id값이랑 등록된 id값이랑 filtering 해서 배제하는 식으로 삭제
            state.lists = state.lists.filter(value => value.id !== payload.id)
        },
        // update action
        updatePost: function(state, {type, payload}){
            // console.log(payload) // 항상 어떤 값이 payload로 들어오는지 확인 또 확인
            state.lists.forEach((value)=>{
                if(value.id === payload.id){
                    value.title = payload.title;
                    value.description = payload.description;
                }
            })
        },
    }
})

// 아래처럼 내가 위에서 만든 actions 밖으로 export 해줘야지 사용 가능하다.
export const {addPost, deletePost,updatePost} = postSlice.actions;

export default postSlice.reducer;
