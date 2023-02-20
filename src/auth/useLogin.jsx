import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase-config';

export async function handleSignIn (email, password ) {
 await signInWithEmailAndPassword(auth, email, password)
}