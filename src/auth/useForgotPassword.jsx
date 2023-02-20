import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase-config';

export async function handleReset(email) {
  await sendPasswordResetEmail(auth, email);
}
