import { combineReducers } from 'redux'
import userReducer from './user'
import msgsReducer from './messages'
import infoReducer from './info'
import statusReducer from './status'

export default combineReducers({
    user: userReducer,
    msgs: msgsReducer,
    info: infoReducer,
    status: statusReducer
})
