import { auth, provider } from '../firebase-config';
import { signInWithPopup } from "firebase/auth";
import Cookies from 'universal-cookie' ;

const cookies = new Cookies();

const Auth = ({setIsAuth}) => {

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            cookies.set('Auth-token', result.user.refreshToken)
            console.log(auth.currentUser.email)
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
