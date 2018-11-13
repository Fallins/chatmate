import types from '../actions/types'

const initState = {
    name: ''
}

export default (state = initState, action) => {
    switch (action.type) {
        case types.ADD_USER:
            return { ...state, name: action.name }
        default:
            return state
    }
}
