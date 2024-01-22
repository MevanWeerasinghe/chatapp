import './App.css';
import Auth from './components/Auth';
import Cookies from 'universal-cookie';
import { useState, useRef } from 'react'
import Chat from './components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('Auth-token'));
  const [room, setRoom] = useState(null);

  const roomRef = useRef(null);

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

  const handleLogout = async () => {
    await signOut(auth);
    cookies.remove('Auth-token');
    setIsAuth(false);
    setRoom(null)
  }

  return (
    <div className="App">
      {room ? (
          <div><Chat room={room} setRoom={setRoom} /></div>
        ) : (
          <div className='create-room'>
            <div className='header'>Create a Room</div>
            <label htmlFor='room-name'>Enter Room Name</label>
            <input id='room-name' type='text' ref={roomRef} />
            <button onClick={() => setRoom(roomRef.current.value)}>Enter Room</button>
          </div>

        )
      }
      <br />
      <br />
      <div className='logout'>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default App;
