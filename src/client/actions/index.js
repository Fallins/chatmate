import types from './types'

export const addUser = name => ({
    type: types.ADD_USER,
    name
})

export const setInfo = info => ({
    type: types.SET_INFO,
    info
})

export const receiveMessage = (room, name, content) => ({
    type: types.RECEIVE_MSG,
    room,
    name,
    content
})

export const actionStatus = (status, action, content) => dispatch => {
    if (status == 'ERROR') {
        return {
            type: types.ERROR_OCCURED,
            name,
            content,
            action
        }
    } else {
        return {
            type: types.RESET_STATUS,
            name,
            content
        }
    }
}
