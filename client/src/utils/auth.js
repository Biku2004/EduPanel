import { auth } from '../firebase';

export const getFreshToken = async () => {
  if (auth.currentUser) {
    const idToken = await auth.currentUser.getIdToken(true); // Force refresh
    localStorage.setItem('token', idToken);
    return idToken;
  }
  throw new Error('No user is signed in');
};