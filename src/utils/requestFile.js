import axios from 'axios'
import {Message} from 'element-ui'
import jwt from 'jsonwebtoken'
import {getToken, setToken, TokenKey} from '@/utils/auth'
import {getUrlParams} from '@/utils'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // baseURL: `${window.location.origin}/api`,
  timeout: 55000 // 请求超时时间
})

function jsonwebtoken(config) {
  const privateKey = 'BoK0lYRnRZaS9TdHlZRVJNM29iWWlOTzdVZFVKCnJLUDJHbGtENmtTMEhUQ3p6V0FoYlJxZm';
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
  config.headers['rights-coupon'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  config.responseType = 'blob'
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
    console.log('response.headers[TokenKey]', response.headers[TokenKey])
    console.log('getToken()', getToken());
    const token = response.headers[TokenKey] || getToken();
    setToken(token)
    return res;
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
