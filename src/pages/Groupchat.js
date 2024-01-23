import '../styles/Groupchat.css'
import { useState } from 'react';
import Chat from '../components/Chat';
import Creategroupchat from '../components/Creategroupchat';

const Groupchat = () => {

    const [room, setRoom] = useState(null);

    return (
        <div className='chat-room'>
            {room ? (
                    <Chat room={room} setRoom={setRoom} />
            ) : (
                    <Creategroupchat setRoom={setRoom} />
            )}
        </div>
    )
}

export default Groupchat