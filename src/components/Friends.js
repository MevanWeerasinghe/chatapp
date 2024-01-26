import "../styles/Friends.css";
import { useEffect, useState, useRef } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../firebase-config";

const Friends = () => {

    const friendsRef = collection(db, "friends");
    // const searchRef = useRef("");

    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                console.log(user.email);
                const queryFriends = query(friendsRef, where("userEmail", "==", user.email));
                const unsubscribeSnapshot = onSnapshot(queryFriends, (snapshot) => {
                    setFriends([])
                    snapshot.forEach((doc) => {
                        setFriends((friends) => [...friends, {...doc.data(), id: doc.id}]);
                    });
                })
    
                return () => unsubscribeSnapshot();
            }
        });
    
        return () => unsubscribe();
    }, [])

    const allFriends = friends.map((friend) => {
        return (
            <div className="friend" key={friend.id}>
                <div className="friend-avatar"></div>
                <div className="friend-info">
                    <p className="friend-name">{friend.friendEmail}</p>
                    <p className="friend-last-message">Last Message</p>
                </div>
            </div>
        )
    })

    return (
        <div className="friend-list">
            <div className="search-friend">
                <input type="text" className="search-friend-input" placeholder="search friend here" />
                <button className="search-friend-button">Search</button>
            </div>
            {allFriends}
        </div>
    )
}

export default Friends;