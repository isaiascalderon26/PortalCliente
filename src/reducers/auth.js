import {
  AUTH_LOGIN,
  AUTH_LOGIN_FAIL
} from '../actions/types'

const initialState = {
  logged: null,
  loading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        logged: true,
        loading: false
      }
    case AUTH_LOGIN_FAIL:
      return {
        ...state,
        logged: false,
        loading: false
      }
    default:
      return state
  }
}