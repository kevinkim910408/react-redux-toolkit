import Posts from './components/Posts'

// import {fetchUsers} from './redux/userSlice'
import { loadUsers } from './redux/postSliceThree';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PostsTwo from './components/PostsTwo';
import './App.css'

function App() {
  /*

  // axios 에서 get 한거 보여주기
  // 평범한 store에 접근하기 -> 객체 비구조화를 사용해서 코드를 간결하게
  const {users} = useSelector(state => state.user);
  
  // dispatch를 위한 변수
  const dispatch = useDispatch();

  // fetchUsers() 함수를 dispatch 될때마다 실행시킨다.
  useEffect(()=>{
    dispatch(fetchUsers());
  },[dispatch])

  let userList = [];
  if(users !== undefined){
    userList = users.map((value)=>{
      return <p key={value.id}>{value.id} : {value.title}</p>
    })
  }
  
 */

 // const {lists, error, loading} = useSelector(state=>state.postsTwo)
  // console.log(lists)

  // // firestore에서 get 한거 보여주기
  // const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(loadUsers());
  // },[dispatch])
  
  // if(loading){
  //   return <p>로딩중</p>
  // }
  // if(error){
  //   return <p>에러.. {error}</p>
  // }

  const {lists} = useSelector(state => state.postsThree);

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadUsers());
  },[dispatch])

  console.log(lists.data)

 

  const onSubmitHandler = (e) => { 
    e.preventDefault();
  }

  return (
    <div>
      <h1>CRUD를 연습하지! 리덕스 툴킷버젼</h1>
      {/* 쳥크 없는 툴킷 연습 */}
      {/* <Posts /> */}

      {/* 여기서부터는 Thunk로 firestore 접근 */}
      {/* <PostsTwo /> */}
      {/* 여기서 부터는 Thunk axios로 get 하기 */}
      {/* {userList} */}

      {/* 여기서 부터는 Thunk Axios로 get 하기 -  */}
      <form onSubmit={(e)=> onSubmitHandler(e)}>
        <input type="text"></input>
      </form>
      {lists.data !== undefined ?
      lists.data.map((v)=>{
        return <>
          <p>{v.id}: {v.title}</p>
        </>
      }) :
      <></>}
    </div>
  );
}

export default App;

