import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
// 액션함수
import { addUsers, deleteUser, updateUser } from '../redux/postSliceTwo'

const PostsTwo = () => {
  const dispatch = useDispatch();
  // store에 저장된 값 빼오기
  const {lists} = useSelector(state => state.postsTwo)

  // title, description 은 state 관리 = html이 자꾸 바뀌니까
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  // 업데이트 버튼 누르면 아래 toggle창 생기게 해주는 state
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);

  // 수정 된 값을 저정할 state
  const [updateTitle, updateSetTitle] = useState("");
  const [updateDescription, updateSetDescription] = useState("");

  // 추가 
  const addPostHandler = () =>{
    dispatch(addUsers({uid: lists.length +1, title, description}));
    setTitle("");
    setDescription("");
  }

  // 삭제 - 한 페이지에서 진행하다보니, uid를 따로 생성해서 넘겨준다.
  const deleteHandler =(id, uid) =>{
    dispatch(deleteUser({id, uid}))
  }

  // 수정버튼 toggle
  const updateModal = (id) =>{
    setEdit(true)
    setId(id)
  }

  // 수정
  const updatePostHandler = (updatedData) => {
    dispatch(updateUser(updatedData))
  }

  const dataList = lists.map((value)=>{
    return <li style={{backgroundColor:'#cec6c6', width:'500px', margin: '30px'}}>
            <p>Firebase ID: {value.id}</p>
            <p>User ID: {value.uid}</p>
            <p>TITLE: {value.title}</p>
            <p>DESC: {value.description}</p>
            <button onClick={()=>deleteHandler(value.id, value.uid)}>삭제하기</button>
            <button onClick={()=>updateModal(value.uid)}>수정하기</button>
            <br />
            {edit && id === value.uid &&(
              <>
                <input
                  type="text" 
                  placeholder="타이틀은 여기에 써요"
                  onChange={(e)=>updateSetTitle(e.target.value)}
                />
                <input
                  type="text" 
                  placeholder="설명은 여기에 써요"
                  onChange={(e)=>updateSetDescription(e.target.value)}
                />
                <button onClick={()=>updatePostHandler({id: value.id, uid: value.uid, title: updateTitle, description: updateDescription})}>수정하기</button>
              </>
            )

            }
          </li>
  })

  return (
    <div>
      <input 
        type="text" 
        placeholder="타이틀은 여기에 써요"
        value={title}
        onChange={(event)=>setTitle(event.target.value)}
      />
      <input 
        type="text" 
        placeholder="설명은 여기에 써요" 
        value={description}
        onChange={(event)=>setDescription(event.target.value)}
      />
      <button onClick={addPostHandler}>추가하기</button>
      <ul>
        {dataList}
      </ul>
    </div>
  )
}

export default PostsTwo