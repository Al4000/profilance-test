
const initialState = {
	users: {},
	isOpenSignup: false,
	isAuth: false,
	isAdmin: false,
	login: 'Гость',
	isLoaded: false
}

const main = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_LOADED':
			return {
				...state,
				isLoaded: action.payload,
			}

		case 'SET_USERS':
			return {
				...state,
				users: action.payload,
				isLoaded: true
			}

		case 'OPEN_SIGNUP':
			return {
				...state,
				isOpenSignup: action.payload,
			}

		case 'IS_ADMIN':
			return {
				...state,
				isAdmin: action.payload,
			}

		case 'IS_AUTH':
			return {
				...state,
				isAuth: action.payload,
			}

		case 'AUTH_LOGIN':
			return {
				...state,
				login: action.payload,
			}

		case 'LOGOUT':
			return {
				...state,
				isAuth: false,
				isAdmin: false,
				login: 'Гость'
			}

		default:
			return state
	}
}

export default main
