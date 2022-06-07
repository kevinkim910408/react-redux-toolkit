import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../redux/postSlice';

const Posts = () => {
    // 화면에 보여주고싶은 title, description 에 관한 state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // 값을 수정을 위한 dispatch
    const dispatch = useDispatch();
    // store에서 값을 가져온다, 객체 비구조화를 통해 더 짧은 코드
    const {lists} = useSelector(state => state.posts)
    console.log(lists) // 꼭 가져오면 안에 뭐가 들었는지 체크하자

    // 데이터 추가를 위한 함수 
    const addPostHandler = () =>{
        // dispatch를 통해서 action 함수은 addPost를 불러오고 뒤에 파라미터를 통해서 필요한 데이터를 전송
        dispatch(addPost({id: lists.length +1, title: title, description: description }))
        // input창 초기화작업은 아래 input tag안의 value값에 넣어준다.
        setTitle("");
        setDescription("");
    }

  return (
    <div className='form'>
        <input 
            type="text" 
            placeholder="Enter Post Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
        />
        <input 
            type="text"
            placeholder="Enter Post Desc"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
        />
        <button onClick={addPostHandler}>Add Post</button>

        <div className="posts">
            {/* lists, 즉 store에서 가져온 값이 0보다 크면 아래 tag들을 보여준다 */}
            {/* 만약 0보다 작을경우, 즉 데이터가 없을경우는 "There is no posts"를 보여준다. */}
            {lists.length > 0 ? 
                lists.map(list =>
                <div className="post">
                    <h2>{list.title}</h2>
                    <p>{list.description}</p>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
             ): "There is no posts"}
        </div>
    </div>
  )
}

export default Posts