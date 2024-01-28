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

                console.log(user.email);
                // Query the friends collection for documents where the Emails field contains the user's email
                const queryFriends = query(friendsRef, 
                    where("Emails", "in", [user.email])
                );
                const unsubscribeSnapshot = onSnapshot(queryFriends, async (snapshot) => {
                    console.log(snapshot.docs);
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
                            return {...data, name, picture, id: doc.id};
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