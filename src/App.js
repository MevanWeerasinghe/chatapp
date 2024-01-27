import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Auth from './components/Auth';
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar';
import Friendchat from './pages/Friendchat';
import Groupchat from './pages/Groupchat';
import GroupChatBox from './components/GroupChatBox';
import FriendChatBox from './components/FriendChatBox';
// import { signOut } from 'firebase/auth';
// import { auth } from './firebase-config';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('Auth-token'));
  const [chatType, setChatType] = useState('');
  const [currentFriend, setCurrentFriend] = useState({});
  const [room, setRoom] = useState(null);
  
  // Get the current location
  const location = useLocation();

  // Set the chat type based on the current path
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/friend-chat') {
        setChatType('friend-chat');
    } else if (currentPath === '/group-chat') {
        setChatType('group-chat');
    }
  }, [location]);

  // const handleLogout = async () => {
  //   await signOut(auth);
  //   cookies.remove('Auth-token');
  //   setIsAuth(false);
  //   setRoom(null)
  // }

  if (!isAuth) {
    return (
      <div className="App">
        Welocome to chat app
        <Auth 
          setIsAuth={setIsAuth}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
      <div className='menu'>
      <Navbar />
        <Routes>
          <Route index element={<Friendchat />} />
          <Route path='/friend-chat' element={<Friendchat setCurrentFriend={setCurrentFriend}/>} />
          <Route path='/group-chat' element={<Groupchat setRoom={setRoom} />} />
        </Routes>
      </div>
      </BrowserRouter>
      <div className='chat-room'>
        {chatType === 'group-chat' ? (
          <GroupChatBox room={room} setRoom={setRoom} />
        ) : (
          <FriendChatBox currentFriend={currentFriend} />
        )}
        <button onClick={() => console.log(currentFriend)}>Leave room</button>
      </div>
      

      {/* <br />
      <br />
      <div className='logout'>
        <button onClick={handleLogout}>Logout</button>
      </div> */}
    </div>
  );
}

export default App;
