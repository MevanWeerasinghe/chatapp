import { useEffect, useState, useRef } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../styles/Chat.css";

const GroupChatBox = ({room, setRoom}) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const messagesRef = collection(db, "messages");
    const dummyDiv = useRef(null);

    useEffect(() => {
        const queryMessage = query(messagesRef, where("room", "==", room), orderBy("createdAt"));
        const unsuscribe = onSnapshot(queryMessage, (snapshot) => {
            // console.log(snapshot)
            const newMessages = [];
            snapshot.forEach((doc) => {
                newMessages.push({...doc.data(), id: doc.id});
            });
            setMessages(newMessages);
        })

        return () => unsuscribe();
    }, [room])

    useEffect(() => {
        dummyDiv.current.scrollIntoView({ behavior: "smooth" });
    }, [messages])

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
            <div 
                className={`message ${message.user === auth.currentUser.displayName ? "my-message" : ""}`}
                key={message.id}
            >
                <p className="message-user">{message.user}</p>
                <p className="message-text">{message.text}</p>
            </div>
        )
    })

    const noMessagesStyle = {
        height: "600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#333",
    }


    return (
        <div className="message-section">
            <div className="room-header">
                <p className="room-name">Welcome to {room}</p>
                <button className="leave-button" onClick={() => setRoom(null)}>Leave room</button>
            </div>
            <div className="messages" style={messages.length === 0 ? noMessagesStyle : {}}>
                {messages.length === 0 && <p>There are no messages yet</p>}
                {oldMessages}
                <div ref={dummyDiv} style={{height: "40px"}}></div>
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

export default GroupChatBox;