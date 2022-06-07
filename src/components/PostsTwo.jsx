import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { addUsers } from '../redux/postSliceTwo'

const PostsTwo = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addPostHandler = () =>{
    dispatch(addUsers({title, description}));
  }

  return (
    <div>
      <input 
        type="text" 
        placeholder="타이틀은 여기에 써요"
        onChange={(event)=>setTitle(event.target.value)}
      />
      <input 
        type="text" 
        placeholder="설명은 여기에 써요" 
        onChange={(event)=>setDescription(event.target.value)}
      />
      <button onClick={addPostHandler}>추가하기</button>
    </div>
  )
}

export default PostsTwo