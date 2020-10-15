import axios from 'axios'
import {Message} from 'element-ui'
import store from '../store'
import jwt from 'jsonwebtoken'
import {getToken, TokenKey} from '@/utils/auth'
import {getUrlParams} from '@/utils'
// 创建axios实例
console.log('process.env.BASE_API', process.env)
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  // baseURL: `${window.location.origin}/api`,
  timeout: 55000 // 请求超时时间
})

function jsonwebtoken(config) {
  const privateKey = 'BoK0lYRnRZaS9TdHlZRVJNM29iWWlOT zdVZFVKCnJLUDJHbGtENmtTMEhUQ3p6V0FoYlJxZm';
  const postData = {
    ...config.data
    // timestamp: moment().valueOf()
  };
  const key = jwt.sign(postData, privateKey);
  return {key};
}

service.interceptors.request.use(config => {
  if ((!(getUrlParams(window.location.href).debug && process.env.NODE_ENV !== 'production'))) {
    config.data = process.env.JWT ? jsonwebtoken(config) : config.data;
  }
  // console.log('store.getters.token', store.getters.token);
  if (store.getters.token) {
    config.headers[TokenKey] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config;
}, err => {
  Message.error({message: '请求超时!'});
  return Promise.resolve(err);
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    // const token = response.headers[TokenKey] || getToken();
    // setToken(token)
    if (res.status !== 'success') {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if ((res.status === 'error' && res.message === 'Expired token') || (res.status === 'error' && res.message === 'Wrong number of segments')) {
      //   console.log('logout', res.status, res.message)
      //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload()// 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // }
      console.log('res.message', res.message)
      return Promise.reject(res.message)
    } else {
      return response.data.result
    }
  },
  error => {
    if (error && error.response && error.response.status) {
      switch (error.response.status) {
        case 499:
          Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
          })
          store.dispatch('FedLogOut').then(data => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
          throw error
        case 404:
          Message({
            message: '接口地址错误',
            type: 'error',
            duration: 5 * 1000
          })
          throw error
        default:
          Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
          })
          throw error
      }
    }
  }
)

export default service
