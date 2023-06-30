import axios from 'axios'
import { session } from '@/utils/passage'

let config = {
  baseURL: import.meta.env.VITE_ENDPOINT
}

const http_client = axios.create(config)
let abort_controller = new AbortController()

const auth_interceptor = async (config) => {
  let token
  try {
    token = await session.getAuthToken()
  } catch (error) {
    token = false
  }
  config.headers['Authorization'] = 'Bearer ' + token
  return config
}

const reset_abort_controller_if_required = () => {
  if (abort_controller.signal.aborted) {
    abort_controller = new AbortController()
  }
}

const before_each_call = () => {
  reset_abort_controller_if_required()
}

const access_denied_401_handler = async () => {
  abort_controller.abort()
  await session.signOut()
  window.location.replace('/login')
}

http_client.interceptors.request.use(auth_interceptor)
http_client.defaults.withCredentials = true
http_client.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data)
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      access_denied_401_handler()
    }
    return Promise.reject(error.response)
  }
)

const get = async (url, params) => {
  before_each_call()
  let response = {}
  try {
    response = await http_client.get(url, {
      signal: abort_controller.signal,
      params
    })
    response = { data: response, success: true }
  } catch (error) {
    response = { success: false, error }
  }
  return response
}

const getFile = async (url) => {
  before_each_call()
  let response = {}
  try {
    response = await http_client.get(url, {
      responseType: 'blob',
      signal: abort_controller.signal
    })
    response = { data: response, success: true }
  } catch (error) {
    response = { success: false, error }
  }
  return response
}

const put = async (url, payload) => {
  before_each_call()
  let response = {}
  try {
    response = await http_client.put(url, payload, {
      signal: abort_controller.signal
    })
    response.success = true
  } catch (error) {
    response = { success: false, error }
  }
  return response
}

const post = async (url, payload) => {
  before_each_call()
  let response = {}
  try {
    response = await http_client.post(url, payload, {
      signal: abort_controller.signal
    })
    response = { data: response, success: true }
  } catch (error) {
    response = { success: false, error }
  }
  return response
}

const patch = async (url, payload) => {
  before_each_call()
  let response = {}
  try {
    response = await http_client.patch(url, payload, {
      signal: abort_controller.signal
    })
    response = { data: response, success: true }
  } catch (error) {
    response = { success: false, error }
  }
  return response
}

const del = async (url, params) => {
  before_each_call()
  let response = {}
  try {
    response = await http_client.delete(url, {
      signal: abort_controller.signal,
      params
    })
    response.success = true
  } catch (error) {
    response = { success: false, error }
  }
  return response
}

export { http_client, getFile, get, put, post, patch, del }
