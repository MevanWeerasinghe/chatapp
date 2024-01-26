import '../styles/Friendchat.css';
import Friends from '../components/Friends';
import { useState } from 'react';
import { addDoc, collection, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase-config";

const FriendChat = () => {

    const [isClicked, setIsClicked] = useState(false);
    const [friendEmail, setfriendEmail] = useState("")
    const [validEmail, setValidEmail] = useState(true)

    const userRef = collection(db, "users");
    const friendRef = collection(db, "friends");

    const handleClick = async (event) => {
        event.preventDefault();
        setIsClicked(true)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (friendEmail === "") return;

        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate email
        if (!emailRegex.test(friendEmail)) {
            console.log('Invalid email address');
            setValidEmail(false)
            return;
        }

        // Check if the email is already in the database
        try {
            const userQuery = query(collection(db, "users"), where("email", "==", friendEmail));
            const querySnapshot = await getDocs(userQuery);

            // If the email is not in the database, add it
            if (querySnapshot.empty) {
                await addDoc(userRef, {
                    email: friendEmail,
                    createdAt: serverTimestamp(),
                    user: auth.currentUser.displayName,
                })
            }

            // Check if the friend is already in the friends collection
            const friendQuery = query(collection(db, "friends"), where("friendEmail", "==", friendEmail));
            const friendSnapshot = await getDocs(friendQuery);

            if (friendSnapshot.empty) {
                await addDoc(friendRef, {
                    userEmail: auth.currentUser.email, 
                    friendEmail: friendEmail,
                    createdAt: serverTimestamp(),
                })
            }
              
        }
        catch (error) {
            console.log(error)
        }

        // Reset the state
        setIsClicked(false)
        setfriendEmail("")
    }

    return (
        <div>
            <div onClick={handleClick} className={`add-friend ${isClicked ? "clicked" : ""}`}>
                {!validEmail ? (
                    <div><p className='invalid-email'>Invalid Email Address</p></div>
                ) : "+ Add a Friend"}
            </div>
            {isClicked && 
            <div className='add-friend-overlay'>
                <form className='add-friend-form' onSubmit={handleSubmit}>
                    <input 
                        type='text' 
                        className='add-friend-email' 
                        placeholder='Enter email of your friend' 
                        onChange={(evet) => setfriendEmail(evet.target.value)}
                        value={friendEmail}
                    />
                    { validEmail ? (
                        <div>
                            <button className='add-friend-email-button' type="submit">Add</button>
                            <button className='add-friend-cancel-button' onClick={() => setIsClicked(false)}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <button 
                                className='add-friend-cancel-button'
                                onClick={() => {
                                    setValidEmail(true);
                                    setfriendEmail("");
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                    
                </form>
            </div>
            }
            <Friends />
        </div>
    );
};

export default FriendChat;
