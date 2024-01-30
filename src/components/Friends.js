import "../styles/Friends.css";
import { useEffect, useState, useRef } from "react";
import { collection, onSnapshot, query, where, getDocs, doc, updateDoc,deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import searchIcon from "../icon/icons8-search-50.png"

const Friends = ({setCurrentFriend}) => {

    const friendsRef = collection(db, "friends");
    const userRef = collection(db, "users");
    // const searchRef = useRef("");

    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                // Query the friends collection for documents where the Emails field contains the user's email
                const queryFriends = query(friendsRef, 
                    where("Emails", "array-contains", user.email)
                );
                const unsubscribeSnapshot = onSnapshot(queryFriends, async (snapshot) => {
                    // Get all the emails from the friends collection
                    const emails = snapshot.docs
                        .map(doc => doc.data().Emails)
                        .flat() // Flatten the array of arrays
                        .filter(email => email !== user.email); 
                    
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
                            const friendEmail = data.Emails.filter(email => email !== user.email)[0];
                            const {name, picture} = emailToNameAndPicture[friendEmail] || {};
                            return {...data, name, picture, friendEmail:friendEmail, id: doc.id};
                        }));
                    }
                })
                return () => unsubscribeSnapshot();
            }
        });
        return () => unsubscribe();
    }, [])

    // i change new try

    const allFriends = friends.map((friend) => {

        const handleFriendClick = () => {
            setCurrentFriend(friend);
            setSelectedFriend(friend.id);
        }

        const handleAccept = async () => {
            const friendDocRef = doc(db, "friends", friend.id); // create a reference to the document
            await updateDoc(friendDocRef, {
                state: "accepted"
            });
            friend.state = "accepted";
        }

        const handleReject = async () => {
            const friendDocRef = doc(db, "friends", friend.id); // create a reference to the document
            await deleteDoc(friendDocRef);
        }

        return (
            <div 
                className={`friend ${selectedFriend === friend.id ? "clicked" : "" }`} 
                key={friend.id} 
                onClick={handleFriendClick}
            >
                <div className="friend-avatar">Add DP</div>
                <div className="friend-info">
                    <p className="friend-name">{friend.name}</p>
                    <p className="friend-email">{friend.friendEmail}</p>
                    <p className="friend-last-message">{friend.lastMessage.text}</p>
                </div>
                {(friend.state === "pending" && friend.sender !== auth.currentUser.email) ? (
                    <div className="friend-request">
                        <p className="friend-request-text">Friend Request</p>
                        <div className="friend-request-buttons">
                            <button className="friend-request-accept-button" onClick={handleAccept}>Accept</button>
                            <button className="friend-request-reject-button" onClick={handleReject}>Reject</button>
                        </div>
                    </div>
                ) : null}
            </div>
        )
    })

    return (
        <div className="friend-list-sec">
            <div className="search-friend">
                <div className="type-area">
                    <input type="text" className="search-friend-input" placeholder="search friend here" />
                    <button className="search-friend-button"><img className="search-icon" src={searchIcon} /></button>
                </div>
            </div>
            <div className="friend-list">
                {allFriends}
            </div>
        </div>
    )
}

export default Friends;