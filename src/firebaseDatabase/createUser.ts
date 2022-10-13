import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebaseConfig'

type createUser = {
	email: string
	password: string
}

export const createUser = async ({ email, password }: createUser) => {
	try {
		const user = await createUserWithEmailAndPassword(auth, email, password)
		return user
	} catch (error) {
		const errorCode = error.code

		switch (errorCode) {
			case 'auth/email-already-in-use':
				return {
					error: `Email already in use.`,
				}
			default:
				return { error: 'Something went wrong.' }
		}
	}
}
