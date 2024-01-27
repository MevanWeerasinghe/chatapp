import { useEffect, useState, useRef } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../styles/Chat.css";

const FriendChatBox = ({currentFriend}) => {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const messagesRef = collection(db, "friendMessages");
    const dummyDiv = useRef(null);

    useEffect(() => {
        if (currentFriend.friendEmail && auth.currentUser.email) {
            const queryMessage = query(messagesRef, 
                where("sender", "in", [auth.currentUser.email, currentFriend.friendEmail]),
                where("reciever", "in", [auth.currentUser.email, currentFriend.friendEmail]),
                orderBy("createdAt")
            )
            const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
                const newMessages = [];
                snapshot.forEach((doc) => {
                    newMessages.push({...doc.data(), id: doc.id});
                });
                setMessages(newMessages);
            })

            return () => unsubscribe();
        }
        
    }, [currentFriend])

    useEffect(() => {
        dummyDiv.current.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (message === "") return;
    
        await addDoc(messagesRef, {
            text: message,
            createdAt: serverTimestamp(),
            senderName: auth.currentUser.displayName,
            sender: auth.currentUser.email,
            reciever: currentFriend.friendEmail,
        });

        setMessage("");
    }

    const oldMessages = messages.map((message) => {
        return (
            <div 
                className={`message ${message.senderName === auth.currentUser.displayName ? "my-message" : ""}`}
                key={message.id}
            >
                <p className="message-user">{message.senderName}</p>
                <p className="message-text">{message.text}</p>
            </div>
        )
    })

    const noMessagesStyle = {
        height: "600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }

    return (
        <div className="message-section">
            <div className="room-header">
                <p className="room-name">{currentFriend.name}</p>
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

export default FriendChatBox;
