import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'


// 超时
axios.defaults.timeout = 15000
// 允许发送cookie
axios.defaults.withCredentials = true
// 标记 XMLHttpRequest
// axios.defaults.headers = { 'X-Requested-With': 'XMLHttpRequest' }
// request interceptor 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // if (store.getters.token) {
  //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  //   config.headers['X-Token'] = getToken()
  // }
  return config
}, error => {
  // 对请求错误做些什么
  console.log(error) // for debug
  Promise.reject(error)
})


// respone interceptor 添加响应拦截器
axios.interceptors.response.use(
    response => response,
    error => {
      console.log('error:', error) // for debug
  
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
  
      error && (error._type = 'system')
      return Promise.reject(error)
})


const specialDo = (res) => {
    if (res.status === 4030) {
      if (window.isIframe) {
        parent.window.location.href = res.login_url
        // window.parent.postMessage({ RefreshLogin: res.login_url }, '*')
      } else {
        window.location.href = res.login_url
        // Bus.$emit('RefreshLogin', res.login_url)
      }
    }
  }
  
  
  // 封装的
  const ajax = {
    get(url, data) {
      return new Promise((resolve, reject) => {
        const a = { params: data }
        axios.get(url, a).then((response) => {
          specialDo(response.data)
          resolve(response.data)
        }, (response) => {
          reject(response.data)
        })
      })
    },
    post(url, data) {
      return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(data)).then((response) => {
          specialDo(response.data)
          resolve(response.data)
        }).catch((response) => {
          reject(response.data)
        })
      })
    }
  }
  
  Vue.prototype.$ajax = ajax
  
  export default axios
  