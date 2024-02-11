import './App.css';
import Auth from './components/Auth';
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar';
import Friendchat from './pages/Friendchat';
import Groupchat from './pages/Groupchat';
import GroupChatBox from './components/GroupChatBox';
import FriendChatBox from './components/FriendChatBox';
import FriendStartPage from './components/FriendStartPage';
import GroupStartPage from './components/GroupStartPage';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('Auth-token'));
  const [chatType, setChatType] = useState('friend-chat');
  const [currentFriend, setCurrentFriend] = useState('none');
  const [showchat, setShowChat] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [room, setRoom] = useState('none');

  const handleLogout = async () => {
    await signOut(auth);
    cookies.remove('Auth-token');
    setIsAuth(false);
    setRoom(null)
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isAuth) {
    return (
      <div className="App">
        <div className='signin-page'>
          <Auth 
            setIsAuth={setIsAuth}
          />
        </div>
      </div>
    );
  }

  if (windowWidth < 767) {
    return (
      <div className="AppMobile">
        {!showchat ? (
          <div className='menu'>
            <Navbar setChatType={setChatType} handleLogout={handleLogout}/>
            {chatType === 'friend-chat' ? (
              <Friendchat setCurrentFriend={setCurrentFriend} setShowChat={setShowChat} />
            ) : (
              <Groupchat room={room} setRoom={setRoom} setShowChat={setShowChat} />
            )}
          </div>
        ) : (
          <div className='chat-room'>
            {chatType === 'group-chat' ? (
              room === 'none' ? (
                <GroupStartPage />
              ) : (
                <GroupChatBox room={room} setRoom={setRoom} setShowChat={setShowChat} />
              )
            ) : (
              currentFriend === 'none' ? (
                <FriendStartPage />
              ) : (
                <FriendChatBox currentFriend={currentFriend} setShowChat={setShowChat} />
              )
            )}
          </div>
        )}
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
          <Groupchat room={room} setRoom={setRoom} />
        )}

      </div>
      <div className='chat-room'>
        {chatType === 'group-chat' ? (
          room === 'none' ? (
            <GroupStartPage />
          ) : (
            <GroupChatBox room={room} setRoom={setRoom} />
          )
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
