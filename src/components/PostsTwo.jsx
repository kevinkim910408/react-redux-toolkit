import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUsers } from '../redux/postSliceTwo'

const PostsTwo = () => {
  const dispatch = useDispatch();
  const {lists} = useSelector(state => state.postsTwo)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addPostHandler = () =>{
    dispatch(addUsers({title, description}));
    setTitle("");
    setDescription("");
  }

  const dataList = lists.map((value)=>{
    return <li style={{backgroundColor:'#cec6c6', width:'500px', margin: '30px'}}>
            <p>Firebase ID: {value.id}</p>
            <p>TITLE: {value.title}</p>
            <p>DESC: {value.description}</p>
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