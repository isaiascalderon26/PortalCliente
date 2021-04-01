import {
    AUTH_LOGIN,
    AUTH_LOGIN_FAIL
} from './types'

export const loggInSuccess = () => dispatch => {
    dispatch({
        type: AUTH_LOGIN
    })
}

export const loggInFail = () => dispatch => {
    dispatch({
        type: AUTH_LOGIN_FAIL
    })
}
