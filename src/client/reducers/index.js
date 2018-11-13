import { combineReducers } from 'redux'
import userReducer from './user'
import msgsReducer from './messages'

export default combineReducers({
    user: userReducer,
    msgs: msgsReducer
})
