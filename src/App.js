import './App.css';
import Auth from './components/Auth';
import Cookies from 'universal-cookie';
import { useState } from 'react'
import Chat from './components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import Creategroupchat from './components/Creategroupchat';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('Auth-token'));
  const [room, setRoom] = useState(null);

  if (!isAuth) {

    const handleLogout = async () => {
      await signOut(auth);
      cookies.remove('Auth-token');
      setIsAuth(false);
      setRoom(null)
    }

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
      {room ? (
          <div>
            <Chat room={room} setRoom={setRoom} />
          </div>
          
        ) : (
          <div>
            <Creategroupchat setRoom={setRoom} />
          </div>

        )
      }
      {/* <br />
      <br />
      <div className='logout'>
        <button onClick={handleLogout}>Logout</button>
      </div> */}
    </div>
  );
}

export default App;
