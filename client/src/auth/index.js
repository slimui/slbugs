// import decode from 'jwt-decode'
import {
	CognitoUserPool,
	CognitoUser,
	AuthenticationDetails,
	CognitoUserAttribute
} from 'amazon-cognito-identity-js'

let userPool = new CognitoUserPool({
	UserPoolId: process.env.REACT_APP_USER_POOL_ID,
	ClientId: process.env.REACT_APP_APP_CLIENT_ID
})

export const signUp = ({ email, password, name }) => {
	var attributeList = []
	let Name = new CognitoUserAttribute({
		Name: 'custom:Name',
		Value: name
	})
	attributeList.push(Name)
	return new Promise((resolve, reject) =>
		userPool.signUp(
			email.trim(),
			password.trim(),
			attributeList,
			null,
			(err, result) => {
				if (err) {
					reject(err)
					return
				}
				resolve(result)
			}
		)
	)
}

export const confirmUser = async ({ email, code }) => {
	const userData = {
		Username: email,
		Pool: userPool
	}
	const cognitoUser = new CognitoUser(userData)
	return new Promise((resolve, reject) =>
		cognitoUser.confirmRegistration(code, true, (err, result) => {
			if (err) {
				reject(err)
				return
			}
			resolve(result)
		})
	)
}

export function signOutUser(history) {
	const currentUser = userPool.getCurrentUser()

	if (currentUser !== null) {
		currentUser.signOut()
	}

	window.location.href = '/'
}

export const login = (email, password) => {
	const user = new CognitoUser({ Username: email, Pool: userPool })
	const authenticationData = { Username: email, Password: password }
	const authenticationDetails = new AuthenticationDetails(authenticationData)

	return new Promise((resolve, reject) =>
		user.authenticateUser(authenticationDetails, {
			onSuccess: result => resolve(),
			onFailure: err => reject(err)
		})
	)
}

export const authUser = async () => {
	const currentUser = userPool.getCurrentUser()

	if (currentUser === null) {
		return false
	}

	await getUserToken(currentUser)
	// decode(getUserToken(currentUser))
	return true
}

const getCurrentUser = () => {
	const currentUser = userPool.getCurrentUser()
	if (currentUser !== null) {
		return currentUser
	}
	return null
}

export function getUserToken() {
	const currentUser = getCurrentUser()

	return new Promise((resolve, reject) => {
		currentUser.getSession(function(err, session) {
			if (err) {
				reject(err)
				return
			}
			resolve(session.getIdToken().getJwtToken())
		})
	})
}
