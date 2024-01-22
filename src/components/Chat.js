import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../styles/Chat.css";

const Chat = ({room, setRoom}) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessage = query(messagesRef, where("room", "==", room), orderBy("createdAt"));
        const unsuscribe = onSnapshot(queryMessage, (snapshot) => {
            // let messages = [];     ALT
            setMessages([])
            snapshot.forEach((doc) => {
                // messages.push({...doc.data(), id: doc.id});      ALT
                setMessages((messages) => [...messages, {...doc.data(), id: doc.id}]);
            });
            // setMessages(messages);    ALT
        })

        return () => unsuscribe();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (message === "") return;

        await addDoc(messagesRef, {
            text: message,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: room
        });
        setMessage("");
    }

    const oldMessages = messages.map((message) => {
        return (
            <div className="message" key={message.id}>
                <p className="message-user">{message.user}</p>
                <p className="message-text">{message.text}</p>
            </div>
        )
    })

    return (
        <div className="message-section">
            <div className="room-header">
                <p className="room-name">Welcome to {room}</p>
                <button className="leave-button" onClick={() => setRoom(null)}>Leave room</button>
            </div>
            <div className="messages">
                {oldMessages}
            </div>
            <form onSubmit={handleSubmit} className="new-message-form">
                <input 
                    className="new-message-input"
                    placeholder='Type your message here...' 
                    onChange={(event) => setMessage(event.target.value)}
                    value={message}
                />
                <button className="send-button" type="submit" >Send</button>
            </form>
        </div>
    );
};

export default Chat;