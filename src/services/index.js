/* 封装get、post等请求 */
import axios from './axios'

let instance = axios()
export default {
  get(url, params, headers) {
    let options = {}

    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    return instance.get(url, options)
  },
  post(url,data,headers,params) {
    let options = {}
    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    return instance.post(url, data, options)
  },
  put(url, params, headers) {
    let options = {}

    if (headers) {
      options.headers = headers
    }
    return instance.put(url, params, options)
  },
  delete(url, params, headers) {
    let options = {}

    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    return instance.delete(url, options)
  }
}