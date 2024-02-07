import '../styles/CreateAndJoinGroupChat.css';
import { useState, useRef } from 'react';
import { addDoc, collection, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase-config";

const CreateGroupChat = ({ setRoom }) => {

    const [roomExists, setRoomExists] = useState(false);
    const groupsUsers = collection(db, "groupsUsers");
    const roomRef = useRef(null);

    const handleClick = async (event) => {
        event.preventDefault();
        if (roomRef.current.value === "") return;

        const queryGroupsUsers = query(groupsUsers, where("room", "==", roomRef.current.value));
        const querySnapshot = await getDocs(queryGroupsUsers);

        // If the room is not in the database, add it
        if (querySnapshot.empty) {
            await addDoc(groupsUsers, {
                user: auth.currentUser.email,
                room: roomRef.current.value,
                createdAt: serverTimestamp(),
            })

            setRoom(roomRef.current.value);
            roomRef.current.value = "";
        } else {
            setRoomExists(true)
            console.log('Room already exists');
        }  
    }

    return (
        <div className='create-room-sec'>
            {!roomExists ? (
                <p className='create-room-label'>Enter New group chat Name</p>
            ) : (
                <p className='create-room-label'>Group Name already exist</p>
            )}
            <div className='create-room'>
                <input 
                    className='room-name-input' 
                    type='text' 
                    ref={roomRef} 
                    placeholder='Enter group chat Name' 
                />
                {!roomExists ? (
                    <button className='room-name-input-button' onClick={handleClick}>
                        Create Room
                    </button>
                ) : (
                    <button 
                        className='room-name-input-button' 
                        onClick={() => {
                            setRoomExists(false)
                            roomRef.current.value = "";
                        }}
                    >
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
}

export default CreateGroupChat;