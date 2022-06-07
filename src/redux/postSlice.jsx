import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        lists:[]
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
        }
    }
})

// 아래처럼 내가 위에서 만든 acitons를 밖으로 export 해줘야지 사용 가능하다.
export const {addPost, deletePost} = postSlice.actions;

export default postSlice.reducer;