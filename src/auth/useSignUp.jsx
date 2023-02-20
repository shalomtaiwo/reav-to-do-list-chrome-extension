import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase-config';

export async function handleSignUp(email, password) {
  await createUserWithEmailAndPassword(auth, email, password);
}
