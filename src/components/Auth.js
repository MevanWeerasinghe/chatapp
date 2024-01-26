import { addDoc, collection, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { auth, provider, db } from '../firebase-config';
import { signInWithPopup } from "firebase/auth";
import Cookies from 'universal-cookie' ;

const cookies = new Cookies();

const Auth = ({setIsAuth}) => {
    const userRef = collection(db, "users");

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            cookies.set('Auth-token', result.user.refreshToken)

            const email = result.user.email;

            const userQuery = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(userQuery);

            if (querySnapshot.empty) {
                await addDoc(userRef, {
                    email: result.user.email,
                    createdAt: serverTimestamp(),
                    user: result.user.displayName,
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
            <p> Sign in with google to continue </p>
            <button onClick={signInWithGoogle}> Sign in with google </button>
        </div>
    )
}

export default Auth;
