import { useRef } from 'react';

const Creategroupchat = ({ setRoom }) => {
    const roomRef = useRef(null);

    return (
        <div className='create-room'>
            <div className='header'>Create a group chat</div>
            <label htmlFor='room-name'>Enter group chat Name</label>
            <input id='room-name' type='text' ref={roomRef} />
            <button onClick={() => setRoom(roomRef.current.value)}>Enter Room</button>
        </div>
    );
}

export default Creategroupchat;