import axios from 'axios'

export const authLogin = (payload) => ({
	type: 'AUTH_LOGIN',
	payload: payload
})

export const setLoaded = (payload) => ({
	type: 'SET_LOADED',
	payload
})

export const setUsers = (users) => ({
	type: 'SET_USERS',
	payload: users
})

export const fetchUsers = () => (dispatch) => {
	dispatch({
		type: 'SET_LOADED',
		payload: false
	})

	axios
		.get('./users.json')
		.then(({ data }) => {
			setTimeout(() => {
				dispatch(setUsers(data))
			}, 300) // emulate server response
		})
}

export const openSignup = (bool) => ({
	type: 'OPEN_SIGNUP',
	payload: bool
})

export const isAuth = (bool) => ({
	type: 'IS_AUTH',
	payload: bool
})

export const isAdmin = (bool) => ({
	type: 'IS_ADMIN',
	payload: bool
})

export const logout = () => ({
	type: 'LOGOUT'
})
