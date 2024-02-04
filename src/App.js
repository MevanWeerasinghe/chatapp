import './App.css';
import Auth from './components/Auth';
import Cookies from 'universal-cookie';
import { useState } from 'react'
import Navbar from './components/Navbar';
import Friendchat from './pages/Friendchat';
import Groupchat from './pages/Groupchat';
import GroupChatBox from './components/GroupChatBox';
import FriendChatBox from './components/FriendChatBox';
import FriendStartPage from './components/FriendStartPage';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('Auth-token'));
  const [chatType, setChatType] = useState('friend-chat');
  const [currentFriend, setCurrentFriend] = useState('none');
  const [room, setRoom] = useState(null);

  const handleLogout = async () => {
    await signOut(auth);
    cookies.remove('Auth-token');
    setIsAuth(false);
    setRoom(null)
  }

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
      <div className='menu'>
        <Navbar setChatType={setChatType} handleLogout={handleLogout}/>
        {chatType === 'friend-chat' ? (
          <Friendchat setCurrentFriend={setCurrentFriend} />
        ) : (
          <Groupchat setRoom={setRoom} />
        )}

      </div>
      <div className='chat-room'>
        {chatType === 'group-chat' ? (
          <GroupChatBox room={room} setRoom={setRoom} />
        ) : (
          currentFriend === 'none' ? (
            <FriendStartPage />
          ) : (
            <FriendChatBox currentFriend={currentFriend} />
          )
        )}
      </div>
    </div>
  );
}

export default App;
