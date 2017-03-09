import { combineReducers } from 'redux'


const rootReducer = combineReducers({
  auth: require('./auth').default,
  game: require('./gameReducer').default
})

export default rootReducer
