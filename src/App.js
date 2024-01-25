import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Cookies from 'universal-cookie';
import { useState } from 'react'
import Navbar from './components/Navbar';
import Friendchat from './pages/Friendchat';
import Groupchat from './pages/Groupchat';
import Chat from './components/Chat';
// import { signOut } from 'firebase/auth';
// import { auth } from './firebase-config';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('Auth-token'));
  const [room, setRoom] = useState(null);
  

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
          <Route path='/friend-chat' element={<Friendchat />} />
          <Route path='/group-chat' element={<Groupchat setRoom={setRoom}/>} />
        </Routes>
      </div>
      </BrowserRouter>
      <div className='chat-room'>
        <Chat room={room} setRoom={setRoom} />
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
