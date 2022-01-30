const initialState = {
	items: [],
	isLoaded: false,
	newsAddPopupOpen: false
}

const news = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_NEWS':
			return {
				...state,
				items: action.payload,
				isLoaded: true
			}

		case 'ADD_NEWS':
			return {
				...state,
				items: [action.payload, ...state.items]
			}

		case 'CONFIRM_NEWS': {
			const newItems = [
				...state.items
			]
			newItems[action.payload].confirmed = true

			return {
				...state,
				items: newItems
			}
		}

		case 'DELETE_NEWS': {
			const newItems = [
				...state.items,
			]
			newItems.splice(action.payload, 1)
			return {
				...state,
				items: newItems,
				isLoaded: true
			}
		}

		case 'SET_LOADED':
			return {
				...state,
				isLoaded: action.payload
			}

		case 'SET_NEWS_ADD_OPEN':
			return {
				...state,
				newsAddPopupOpen: action.payload
			}

		default:
			return state
	}
}

export default news
