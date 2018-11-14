import types from '../actions/types'

const initState = {}

export default (state = initState, action) => {
    switch (action.type) {
        case types.ERROR_OCCURED:
            return {
                name: action.name,
                content: action.name,
                status: action.status
            }
        case types.RESET_STATUS:
            return initState
        default:
            return state
    }
}
