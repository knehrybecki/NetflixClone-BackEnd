import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebaseConfig'
type loginUser = {
	email: string
	password: string
}
export const logInWithEmailAndPassword = async ({ email, password }: loginUser) => {
	try {
		const user = await signInWithEmailAndPassword(auth, email, password)
		
		return user
	} catch (error) {

		switch (error.code) {
			case 'auth/user-not-found':
				return {
					error: `Sorry, we can't find an account with this email address.`,
				}
			case 'auth/wrong-password':
				return { error: 'Wrong password.' }
			case 'auth/invalid-email':
				return { error: 'Invalid email.' }
			case 'auth/user-disabled':
				return { error: 'User disabled.' }
			case 'auth/too-many-requests':
				return { error: 'Too many requests.' }
			default:
				return { error: 'Something went wrong.' }
		}
	}
}
