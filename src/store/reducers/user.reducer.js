import { userService } from "../../services/user.service.js";

export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'

const initialState = {
    user: userService.getLoggedinUser()
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {

        case 'INCREMENT':
            return { ...state, count: state.count + 1 }
        case 'DECREMENT':
            return { ...state, count: state.count - 1 }
        case 'CHANGE_BY':
            return { ...state, count: state.count + action.diff }

        // User
        case SET_USER:
            return { ...state, user: action.user }

        case SET_USER_SCORE:
            return { ...state, user: { ...state.user, score: action.score } }

        default:
            return state;
    }
}