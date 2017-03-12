import { combineReducers } from 'redux'


const rootReducer = combineReducers({
  game: require('./gameReducer').default
})

export default rootReducer
