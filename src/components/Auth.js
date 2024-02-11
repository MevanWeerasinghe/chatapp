import '../styles/Auth.css';
import { addDoc, collection, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { auth, provider, db } from '../firebase-config';
import { signInWithPopup } from "firebase/auth";
import Cookies from 'universal-cookie' ;
import logo from '../icon/Webling2.png';

const cookies = new Cookies();

const Auth = ({setIsAuth}) => {
    const userRef = collection(db, "users");
    const currentFriendsRef = collection(db, "currentFriends");

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            cookies.set('Auth-token', result.user.refreshToken)

            const email = result.user.email;

            // Check if the email is already in the database
            const userQuery = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(userQuery);

            if (querySnapshot.empty) {
                await addDoc(userRef, {
                    email: result.user.email,
                    createdAt: serverTimestamp(),
                    user: result.user.displayName,
                    picture: result.user.photoURL
                })

                await addDoc(currentFriendsRef, {
                    email: result.user.email,
                    friend: ""
                })
            }
            setIsAuth(true);
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="auth">
            <div className="signin-header">
                <img src={logo} alt="logo" className="signin-logo" />
                <p className='title'>Welcome to our <span className='chat-app-text'>Chat Application!</span> </p>
            </div>
            <p className='text'>
                Welcome to our cutting-edge React-powered chat app, seamlessly integrated with Firebase services. 
                This dynamic platform offers a user-friendly interface, ensuring real-time connections with friends. 
                Engage in instant conversations and elevate communication by creating and managing group chats effortlessly. 
                With Firebase's robust backend, our app guarantees efficient data synchronization, delivering messages instantly across all users. 
                Enjoy a personalized experience with customizable profiles and robust notification management. 
                Your privacy is our priority with Firebase Authentication, creating a secure space for interactions. 
                Our responsive design ensures a fluid and enjoyable experience across various devices, 
                making this app the future of vibrant and meaningful conversations with friends and groups. 
                Welcome to a new era of communication!
            </p>
            <div className="signin-footer">
                <p className='footer-text'> Sign in with google to continue </p>
                <div className='google-sign-in-button' onClick={signInWithGoogle}>
                    <img className='google-icon' src="https://img.icons8.com/color/48/000000/google-logo.png" alt="google" />
                    <div className='button-text' >Sign in with google</div>
                </div>
            </div>
        </div>
    )
}

export default Auth;
