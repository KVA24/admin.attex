// constants
import {AuthActionTypes} from './constants'

export interface AuthActionType {
  type: AuthActionTypes.API_RESPONSE_SUCCESS
    | AuthActionTypes.API_RESPONSE_ERROR
    | AuthActionTypes.FORGOT_PASSWORD
    | AuthActionTypes.FORGOT_PASSWORD_CHANGE
    | AuthActionTypes.GET_DATA_USER
    | AuthActionTypes.LOGIN_USER
    | AuthActionTypes.LOGOUT_USER
    | AuthActionTypes.RESET
    | AuthActionTypes.SIGNUP_USER
  payload: object | string
}

interface UserData {
  id: number
  username: string
  password: string
  firstName: string
  lastName: string
  role: string
  token: string
}

// common success
export const authApiResponseSuccess = (actionType: string, data: UserData | object): AuthActionType => ({
  type: AuthActionTypes.API_RESPONSE_SUCCESS,
  payload: {actionType, data},
})
// common error
export const authApiResponseError = (actionType: string, error: string): AuthActionType => ({
  type: AuthActionTypes.API_RESPONSE_ERROR,
  payload: {actionType, error},
})

export const getProfile = () => ({
  type: AuthActionTypes.GET_DATA_USER,
  payload: {}
})

export const loginUser = (username: string, password: string, otp: string, sign: string): AuthActionType => ({
  type: AuthActionTypes.LOGIN_USER,
  payload: {username, password, otp, sign},
})

export const logoutUser = (): AuthActionType => ({
  type: AuthActionTypes.LOGOUT_USER,
  payload: {},
})

export const signupUser = (email: string, password: string): AuthActionType => ({
  type: AuthActionTypes.SIGNUP_USER,
  payload: {email, password},
})

export const forgotPassword = (username: string): AuthActionType => ({
  type: AuthActionTypes.FORGOT_PASSWORD,
  payload: {username},
})

export const resetAuth = (): AuthActionType => ({
  type: AuthActionTypes.RESET,
  payload: {},
})
