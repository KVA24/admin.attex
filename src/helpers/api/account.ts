import {APICore} from './apiCore'

const api = new APICore()

export function getList(page?: number, size?: number) {
  const baseUrl = `/v1/portal/account?page=${page}&size=${size}`
  return api.get(`${baseUrl}`, {})
}

export function getDetail(id: string) {
  const baseUrl = `/v1/portal/account/${id}`
  return api.get(`${baseUrl}`, {})
}

export function create(data: any) {
  const baseUrl = `/v1/portal/account`
  return api.create(`${baseUrl}`, data)
}

export function update(id: string, data: any) {
  const baseUrl = `/v1/portal/account/${id}`
  return api.update(`${baseUrl}`, data)
}

export function remove(id: string) {
  const baseUrl = `/v1/portal/account/${id}`
  return api.delete(`${baseUrl}`)
}

