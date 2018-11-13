import openSocket from 'socket.io-client'
import { receiveMessage } from '../actions'
let socket

const init = dispatch => {
    socket = openSocket() //'ws://localhost:4000'
    console.log(`socket has connected.`, { socket })

    socket.on('greet', msg => {
        console.log('onGreet', msg)
        dispatch(receiveMessage('system', msg.name, msg.content))
    })

    socket.on('message', msg => {
        console.log('onMessage', msg)
        dispatch(receiveMessage('general', msg.name, msg.content))
    })
}

const greet = name => {
    socket.emit('greet', name)
}

const sendMsg = (room, name, msg) => {
    socket.emit('message', { room, name, msg })
}

export { init, greet, sendMsg }
