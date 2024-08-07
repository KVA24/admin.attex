import {all, fork, put, takeEvery, call} from 'redux-saga/effects'
import {SagaIterator} from '@redux-saga/core'

// apicore
import {APICore, setAuthorization} from "@/helpers/api/apiCore.ts";

// helpers
import {
  getProfile as profileApi,
  login as loginApi,
  signup as signupApi,
  forgotPassword as forgotPasswordApi
} from '../../helpers/api/auth'

// actions
import {authApiResponseSuccess, authApiResponseError} from './actions'

// constants
import {AuthActionTypes} from './constants'

interface UserData {
  payload: {
    username: string
    password: string
    email: string
    otp: string
    sign: string
  }
  type: string
}

const api = new APICore()

/**
 * Login the user
 * @param {*} payload - username and password
 */

function* getProfile(): SagaIterator {
  try {
    const response = yield call(profileApi)
    const profile = response.data
    api.setLoggedInUser(profile)
  } catch (error: any) {
    api.setLoggedInToken(null)
    api.setLoggedInUser(null)
    setAuthorization(null)
  }
}

/**
 * Login the user
 * @param {*} payload - username and password
 */

function* login({payload: {username, password, otp, sign}}: UserData): SagaIterator {
  try {
    const res1 = yield call(loginApi, {username, password, otp, sign})
    const auth = res1.data
    setAuthorization(auth.accessToken)
    const res2 = yield call(profileApi)
    const profile = res2.data
    api.setLoggedInToken(auth.accessToken)
    api.setLoggedInUser(profile)
    yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, profile))
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error))
    api.setLoggedInUser(null)
    setAuthorization(null)
  }
}

/**
 * Logout the user
 */
function* logout(): SagaIterator {
  try {
    // yield call(logoutApi)
    api.setLoggedInUser(null)
    setAuthorization(null)
    yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}))
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error))
  }
}

function* signup({payload: {email, password}}: UserData): SagaIterator {
  try {
    const response = yield call(signupApi, {email, password})
    const user = response.data
    // api.setLoggedInUser(user);
    // setAuthorization(user['token']);
    yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user))
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error))
    api.setLoggedInUser(null)
    setAuthorization(null)
  }
}

function* forgotPassword({payload: {username}}: UserData): SagaIterator {
  try {
    const response = yield call(forgotPasswordApi, {username})
    yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data))
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error))
  }
}

export function* watchGetProfile() {
  yield takeEvery(AuthActionTypes.GET_DATA_USER, getProfile)
}

export function* watchLoginUser() {
  yield takeEvery(AuthActionTypes.LOGIN_USER, login)
}

export function* watchLogout() {
  yield takeEvery(AuthActionTypes.LOGOUT_USER, logout)
}

export function* watchSignup(): any {
  yield takeEvery(AuthActionTypes.SIGNUP_USER, signup)
}

export function* watchForgotPassword(): any {
  yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword)
}

function* authSaga() {
  yield all([fork(watchGetProfile), fork(watchLoginUser), fork(watchLogout), fork(watchSignup), fork(watchForgotPassword)])
}

export default authSaga
