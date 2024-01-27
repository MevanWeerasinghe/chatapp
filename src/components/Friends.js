import "../styles/Friends.css";
import { useEffect, useState, useRef } from "react";
import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase-config";

const Friends = ({setCurrentFriend}) => {

    const friendsRef = collection(db, "friends");
    const userRef = collection(db, "users");
    // const searchRef = useRef("");

    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const queryFriends = query(friendsRef, where("userEmail", "==", user.email));
                const unsubscribeSnapshot = onSnapshot(queryFriends, async (snapshot) => {
                    // Get all the friends' emails
                    const emails = snapshot.docs.map(doc => doc.data().friendEmail);
    
                    // Only perform the query if emails array is not empty
                    if (emails.length > 0) {
                        // Query the users collection for documents where the email field is in the emails array
                        const userQuery = query(userRef, where("email", "in", emails));
                        const userSnapshot = await getDocs(userQuery);

                        // Create a map of emails to names and pictures
                        const emailToNameAndPicture = {};
                        userSnapshot.docs.forEach(doc => {
                            const data = doc.data();
                            emailToNameAndPicture[data.email] = {name: data.user, picture: data.picture};
                        });

                        // Add the friends' data and the users' names and pictures to the friends state
                        setFriends(snapshot.docs.map(doc => {
                            const data = doc.data();
                            const {name, picture} = emailToNameAndPicture[data.friendEmail] || {};
                            return {...data, name, picture, id: doc.id};
                        }));
                    }
                })
                return () => unsubscribeSnapshot();
            }
        });
    
        return () => unsubscribe();
    }, [])

    //

    const allFriends = friends.map((friend) => {

        const handleFriendClick = () => {
            setCurrentFriend(friend);
            setSelectedFriend(friend.id);
        }

        return (
            <div className={`friend ${selectedFriend === friend.id ? "clicked" : "" }`} key={friend.id} onClick={handleFriendClick}>
                <div className="friend-avatar">Add DP</div>
                <div className="friend-info">
                    <p className="friend-name">{friend.name}</p>
                    <p className="friend-email">{friend.friendEmail}</p>
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