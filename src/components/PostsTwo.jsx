import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUsers, deleteUser, updateUser } from '../redux/postSliceTwo'

const PostsTwo = () => {
  const dispatch = useDispatch();
  const {lists} = useSelector(state => state.postsTwo)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);

  const [updateTitle, updateSetTitle] = useState("");
  const [updateDescription, updateSetDescription] = useState("");

  const addPostHandler = () =>{
    dispatch(addUsers({uid: lists.length +1, title, description}));
    setTitle("");
    setDescription("");
  }

  const deleteHandler =(id, uid) =>{
    dispatch(deleteUser({id, uid}))
  }

  const updateModal = (id) =>{
    setEdit(true)
    setId(id)
  }

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