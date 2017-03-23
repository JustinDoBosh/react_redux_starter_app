import * as types from '../constants/constants'

const initialIndexState = {
    phrase: 'Hello World!'
}

function index(state = initialIndexState, action) {
    switch(action.type) {

        case types.SET_PHRASE:
            return {
                ...state,
                phrase: action.phrase
            }

        default:
            return state
    }
}


export default index