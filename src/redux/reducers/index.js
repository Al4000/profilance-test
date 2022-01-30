import { combineReducers } from 'redux'

import main from './main'
import news from './news'

const rootReducer = combineReducers({
	main,
	news
})

export default rootReducer
