import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyDi35tjblzXvC3dzADAuJWwa-JfT9rlYM8',
	authDomain: 'netflixclone-bcf2b.firebaseapp.com',
	projectId: 'netflixclone-bcf2b',
	storageBucket: 'netflixclone-bcf2b.appspot.com',
	messagingSenderId: '445256469991',
	appId: '1:445256469991:web:23356a1608e83528c60142',
}

const firebaseapp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseapp)
export const auth = getAuth(firebaseapp)
