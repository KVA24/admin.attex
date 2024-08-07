import {APICore} from './apiCore'

const api = new APICore()

//&sign=${params.sign}
// account
function getProfile() {
  const baseUrl = `/v1/portal/_me`
  return api.get(`${baseUrl}`, {})
}

function login(params: { username: string; password: string, otp: string, sign: string }) {
  const baseUrl = `/v1/portal/auth/login?sign=${params.sign}`
  return api.create(`${baseUrl}`, params)
}

function logout() {
  const baseUrl = '/logout/'
  return api.create(`${baseUrl}`, {})
}

function signup(params: { email: string; password: string }) {
  const baseUrl = '/register/'
  return api.create(`${baseUrl}`, params)
}

function forgotPassword(params: { username: string }) {
  const baseUrl = '/forgot-password/'
  return api.create(`${baseUrl}`, params)
}

export {getProfile, login, logout, signup, forgotPassword}
