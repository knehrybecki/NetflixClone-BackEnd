import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { auth } from '../firebaseDatabase/firebaseConfig'
import { logInWithEmailAndPassword } from './../firebaseDatabase/loginUser'
import { fetchSignInMethodsForEmail, signOut } from 'firebase/auth'
import { createUser } from '../firebaseDatabase'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/login', (req, res) => {
	const email: string = req.body.email
	const password: string = req.body.password

	logInWithEmailAndPassword({ email, password }).then(login => {
		const loginError = login as { error: string }

		if (loginError) {
			res.json({ error: loginError })
			return
		}
		auth.onAuthStateChanged(user => {
			if (user) {
				res.json({ logged: true })
			}
		})
	})
})

app.post('/api/createUser', (req, res) => {
	const email: string = req.body.email
	const password: string = req.body.password

	createUser({ email, password }).then(user => {
		const userError = user as { error: string }

		if (userError) {
			res.json({ error: userError })
			return
		}

		auth.onAuthStateChanged(user => {
			if (user) {
				res.json({ createdUser: true })
			}
		})
	})
})

app.post('/api/checkEmail', (req, res) => {
	fetchSignInMethodsForEmail(auth, req.body.email)
		.then(signInMethods => {
			const CheckEmail = signInMethods as string[]

			if (CheckEmail.length > 0) {
				return res.json({ userExists: true })
			}
			if (CheckEmail.length === 0) {
				return res.json({ userExists: false })
			}
		})
		.catch(() => {
			return res.json({ error: true })
		})
})

app.get('/api/signout', (_req, res) => {
	signOut(auth)
		.then(() => {
			res.json({ user: true })
		})
		.catch(error => {
			res.json({ user: false })
			console.log(error)
		})
})

app.post('/api/user', (_req, res) => {
	if (auth.currentUser) {
		res.json({ user: true })
	}

	if (!auth.currentUser) {
		res.json({ user: false })
	}
})

if (import.meta.env.PROD) {
	app.listen(3001)
}
export const viteNodeApp = app
