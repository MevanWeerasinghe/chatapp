import { useEffect, useState, useRef } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy, getDocs, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../styles/Chat.css";

const FriendChatBox = ({currentFriend}) => {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const messagesRef = collection(db, "friendMessages");
    const friendRef = collection(db, "friends");
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

        console.log(currentFriend);
    
        await addDoc(messagesRef, {
            text: message,
            createdAt: serverTimestamp(),
            senderName: auth.currentUser.displayName,
            sender: auth.currentUser.email,
            reciever: currentFriend.friendEmail,
        });

        // Update the last message in the friends collection
        const friendQuery = query(friendRef, 
            where("Emails", "array-contains-any", [auth.currentUser.email, currentFriend.friendEmail]),
        );
        const friendSnapshot = await getDocs(friendQuery);

        //Filter the documents to find the one that contains both emails
        const friendDoc = friendSnapshot.docs.filter(doc => 
            doc.data().Emails.includes(auth.currentUser.email) && 
            doc.data().Emails.includes(currentFriend.friendEmail)
        )[0];
        
        // Update the last message in the friends collection
        const friendDocRef = doc(db, "friends", friendDoc.id);
        await updateDoc(friendDocRef, {
            lastMessage: {
                text: message,
                createdAt: serverTimestamp(),
                sender: auth.currentUser.email,
                seen: false
            }
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
