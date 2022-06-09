import { list } from 'firebase/storage';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPost, deletePost, updatePost } from '../redux/postSlice';

const Posts = () => {
    // 화면에 보여주고싶은 title, description 에 관한 state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // 값 업데이트를 위한 STATE - 만약 이 값이 TRUE가 되면 업데이트를 해야한다는 뜻
    const [edit, setEdit] = useState(false);
    // 업데이트할 카드를 찾을 id값
    const [id, setId] = useState(null);
    // 업데이트 창에서 값을 입력 받을 state
    const [updateTitle, updateSetTitle] = useState("");
    const [updateDescription, updateSetDescription] = useState("");

    // 값을 수정을 위한 dispatch
    const dispatch = useDispatch();
    // store에서 값을 가져온다, 객체 비구조화를 통해 더 짧은 코드
    const {lists} = useSelector(state => state.posts)
    //console.log(lists) // 꼭 가져오면 안에 뭐가 들었는지 체크하자

    // 데이터 추가를 위한 함수 
    const addPostHandler = () =>{
        // dispatch를 통해서 action 함수은 addPost를 불러오고 뒤에 파라미터를 통해서 필요한 데이터를 전송
        dispatch(addPost({id: lists.length +1, title: title, description: description }))
        // input창 초기화작업은 아래 input tag안의 value값에 넣어준다.
        setTitle("");
        setDescription("");
    }

    // 데이터 삭제를 위한 함수, 파라미터로 id값을 받아온다
    const deletePostHandler = (id) =>{
        // 그 id값을 deletePost 라는 action 함수에 넘겨준다. {받는쪽 key : 주는 값}
        dispatch(deletePost({id: id}));
    }

    // 업데이트 창이 열리게 해주는 함수
    const updateButtonHandler = (id) => {
        setEdit(true)
        setId(id)
    }

    // 실질적으로 값을 reducer로 보내는 action을 취하는 함수
    const updatePostHandler = (updatedData) => {
        // updatedData라는 객체 덩어리를 넘겨준다
        dispatch(updatePost(updatedData))
    }

  return (
    <div className='form'>
        <input 
            type="text" 
            placeholder="타이틀은 여기에 써요"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
        />
        <input 
            type="text"
            placeholder="설명은 여기에 써요"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
        />
        <button onClick={addPostHandler}>추가하기</button>

        <div className="posts">
            {/* lists, 즉 store에서 가져온 값이 0보다 크면 아래 tag들을 보여준다 */}
            {/* 만약 0보다 작을경우, 즉 데이터가 없을경우는 "포스트 된게 없습니다"를 보여준다. */}
            {lists.length > 0 ? 
                lists.map(list =>
                <div key={list.id} className="post">
                    <h2>{list.title}</h2>
                    <p>{list.description}</p>
                    <button onClick={()=>updateButtonHandler(list.id)}>수정하기</button>
                    {/* 데이터를 넘겨줄때는 그냥 함수를 못부르고, 아래처럼 불러야한다. */}
                    <button onClick={()=>deletePostHandler(list.id)}>삭제하기</button>
                    <br />
                    {/* edit이 true고, id가 list.id랑 같으면 아래 tag들을 생성 */}
                    {edit && id === list.id &&(
                        <>
                            <input 
                                type="text" 
                                placeholder="새 타이틀"
                                onChange={(e)=>updateSetTitle(e.target.value)}
                            />
                            <input 
                                type="text" 
                                placeholder="새 설명"
                                onChange={(e)=>updateSetDescription(e.target.value)}
                            />
                            {/* 여기서 생성되는 id, title, description이 위에서 하나의 객체덩어리로 뭉쳐져서  reducer에 던져진다. */}
                            <button onClick={()=>updatePostHandler({id: list.id, title: updateTitle, description: updateDescription})}>수정하기</button>
                        </>
                    )}
                
                
                </div>
             ): "포스트 된게 없습니다"}
        </div>
    </div>
  )
}

export default Posts