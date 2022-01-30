import axios from 'axios'

export const setLoaded = (payload) => ({
	type: 'SET_LOADED',
	payload
})

export const fetchNews = () => (dispatch) => {
	dispatch({
		type: 'SET_LOADED',
		payload: false
	})

	axios
		.get('./news.json')
		.then(({ data }) => {
			setTimeout(() => {
				dispatch(setNews(data))
			}, 1000) // emulate server response
		})
}

export const setNews = (items) => ({
	type: 'SET_NEWS',
	payload: items
})

export const addNews = (obj) => ({
	type: 'ADD_NEWS',
	payload: obj
})

export const confirmNews = (id) => ({
	type: 'CONFIRM_NEWS',
	payload: id
})

export const deleteNews = (id) => ({
	type: 'DELETE_NEWS',
	payload: id
})

export const setNewsAddOpen = (value) => ({
	type: 'SET_NEWS_ADD_OPEN',
	payload: value
})
