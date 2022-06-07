import Posts from './components/Posts'
import './App.css'
import {fetchUsers} from './redux/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PostsTwo from './components/PostsTwo';

function App() {
  // 평범한 store에 접근하기 -> 객체 비구조화를 사용해서 코드를 간결하게
  const {users} = useSelector(state => state.user);
  
  // dispatch를 위한 변수
  const dispatch = useDispatch();

  // fetchUsers() 함수를 dispatch 될때마다 실행시킨다.
  useEffect(()=>{
    dispatch(fetchUsers());
  },[dispatch])

  console.log(users)
  let userList = [];
  if(users !== undefined){
    userList = users.map((value)=>{
      return <p key={value.id}>{value.id} : {value.title}</p>
    })
  }
 

  return (
    <div>
      <h1>CRUD를 연습하지! 리덕스 툴킷버젼</h1>
      {/* 쳥크 없는 툴킷 연습 */}
      {/* <Posts /> */}

      {/* 여기서부터는 Thunk로 firestore 접근 */}
      <PostsTwo />
      {/* 여기서 부터는 Thunk axios로 get 하기 */}
      {userList}

    </div>
  );
}

export default App;

