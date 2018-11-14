import openSocket from 'socket.io-client'
import { receiveMessage, actionStatus, setInfo } from '../actions'
let socket

const init = dispatch => {
    socket = openSocket(window.wsUrl)
    console.log(`socket has connected.`, { socket })

    socket.on('info', info => {
        console.log('INFO: ', info)
        dispatch(setInfo(info))
    })

    // socket.on('join', msg => {
    //     console.log('onJoin', msg)
    //     dispatch(actionStatus(msg.status, msg.action, msg.content))
    // })

    socket.on('greet', msg => {
        console.log('onGreet', msg)
        dispatch(receiveMessage('system', msg.name, msg.content))
    })

    socket.on('message', msg => {
        console.log('onMessage', msg)
        dispatch(receiveMessage('general', msg.name, msg.content))
    })

    socket.on('leaved', msg => {
        console.log('onLeaved', msg)
        dispatch(receiveMessage('system', msg.name, msg.content))
    })
}

const greet = name => {
    socket.emit('greet', name)
}

const sendMsg = (room, name, msg) => {
    socket.emit('message', { room, name, msg })
}

// const join = name => {
//     socket.emit('join', name)
// }

export { init, greet, sendMsg }
