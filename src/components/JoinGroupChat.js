import '../styles/CreateAndJoinGroupChat.css';
import { useState, useRef } from 'react';

const JoinGroupChat = () => {

    const existingRoomRef = useRef(null);

    const handleJoinGroupChat = async (event) => {
        event.preventDefault();
        if (existingRoomRef.current.value === "") return;
        console.log('Joining room:', existingRoomRef.current.value);
    };

    return (
        <div className='join-room-sec'>
            <p className='join-room-label'>Enter Existing group chat Name</p>
            <div className='join-room'>
                <input
                    type="text"
                    className='room-name-input'
                    ref={existingRoomRef}
                    placeholder='Enter group chat Name'
                />
                <button className='room-name-input-button' onClick={handleJoinGroupChat} >Join</button>
            </div>
        </div>
    );
}

export default JoinGroupChat;