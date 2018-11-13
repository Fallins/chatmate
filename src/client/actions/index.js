import types from './types'

export const addUser = name => ({
    type: types.ADD_USER,
    name
})

export const receiveMessage = (room, name, content) => ({
    type: types.RECEIVE_MSG,
    room,
    name,
    content,
})
