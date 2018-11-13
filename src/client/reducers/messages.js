import types from '../actions/types'
import { rooms } from '../common/settings/setting'

// initState
// {
//     room1: [
//         {name: '', content: ''}
//     ],
//     room2: [
//         {name: '', content: ''}
//     ],
// }
const initState = rooms.reduce((acc, cur) => {
    acc[cur] = []
    return acc
}, {})

export default (state = initState, action) => {
    switch (action.type) {
        case types.RECEIVE_MSG:
            return {
                ...state,
                [action.room]: [
                    ...state[action.room],
                    { name: action.name, content: action.content }
                ]
            }
        default:
            return state
    }
}
