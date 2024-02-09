import '../styles/CreateAndJoinGroupChat.css';
import { useState, useRef } from 'react';
import { addDoc, collection, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase-config";

const JoinGroupChat = ({setRoom}) => {

    const [alreadyJoined, setAlreadyJoined] = useState(false);
    const [roomNotExists, setRoomNotExists] = useState(false);
    const groupsUsers = collection(db, "groupsUsers");
    const existingRoomRef = useRef(null);

    const handleJoinGroupChat = async (event) => {
        event.preventDefault();
        if (existingRoomRef.current.value === "") return;

        const alreadyInGroup = query(groupsUsers, where("user", "==", auth.currentUser.email));
        const alreadyInGroupSnapshot = await getDocs(alreadyInGroup);

        if (alreadyInGroupSnapshot.docs.some(doc => doc.data().room === existingRoomRef.current.value)) {
            setAlreadyJoined(true)
        } else {
            const queryGroups = query(groupsUsers, where("room", "==", existingRoomRef.current.value));
            const querySnapshot = await getDocs(queryGroups);

            // If the room is in the database, join it
            if (!querySnapshot.empty) {
                await addDoc(groupsUsers, {
                    user: auth.currentUser.email,
                    room: existingRoomRef.current.value,
                    createdAt: serverTimestamp(),
                })

                setRoom(existingRoomRef.current.value)
                existingRoomRef.current.value = "";
            } else {
                setRoomNotExists(true)
                console.log('Room does not exist');
            }
        }
    };

    const errorStyle = {
        PointerEvents: "none",
        backgroundColor: "#ffcccc",
    }

    return (
        <div className='join-room-sec'>
            {alreadyJoined ? (
                <p className='join-room-label'>You have already joined this group.</p>
            ) : (
                roomNotExists ? (
                    <p className='join-room-label'>{existingRoomRef.current.value} Group does not exist</p>
                ) : (
                    <p className='join-room-label'>Enter Existing Group Name</p>
                )
            )}
            
            <div className='join-room'>
                <input
                    type="text"
                    className='room-name-input'
                    ref={existingRoomRef}
                    placeholder='Enter group chat Name'
                    readOnly={alreadyJoined || roomNotExists}
                    style={alreadyJoined || roomNotExists ? errorStyle : {}}
                />
                {alreadyJoined ? (
                    <button 
                        className='room-name-input-button' 
                        onClick={() => {
                            setAlreadyJoined(false)
                            existingRoomRef.current.value = "";
                        }}
                    >
                        Cancel
                    </button>
                ) :(
                    roomNotExists ? (
                        <button 
                            className='room-name-input-button' 
                            onClick={() => {
                                setRoomNotExists(false)
                                existingRoomRef.current.value = "";
                            }}
                        >
                            Try Again
                        </button>
                    ) : (
                        <button className='room-name-input-button' onClick={handleJoinGroupChat} >Join</button>
                    )
                )}

            </div>
        </div>
    );
}

export default JoinGroupChat;