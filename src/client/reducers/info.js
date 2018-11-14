import types from '../actions/types'

const initState = {}

export default (state = initState, action) => {
    switch (action.type) {
        case types.SET_INFO:
            return {
                ...state,
                ...action.info
            }
        default:
            return state
    }
}
