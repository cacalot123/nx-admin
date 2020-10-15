import {loginPwd, userInfo} from '@/api/user';

import {getToken, removeToken, setToken} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    userInfo: []

  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 登录
    Login({commit}, formData) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginPwd({
          name: formData.name,
          password: formData.password
        }).then(response => {
          const data = response
          setToken(data['rights-coupon'])
          localStorage.setItem('id', data.id)
          // commit('SET_TOKEN', data.key)
          commit('SET_INFO', {id: data.id, name: data.name, mobile: data.mobile, other: data})
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        userInfo({id: localStorage.getItem('id')}).then(response => {
          const data = response
          if (data.permissions && data.permissions.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.permissions)
          } else {
            reject('该用户还没有权限，请先联系管理员配置权限')
            // console.log('该用户还没有权限')
          }
          commit('SET_NAME', data.login_name)
          commit('SET_INFO', {id: data.id, name: data.login_name, mobile: data.mobile, other: data})
          // setToken(data.key)
          // commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_INFO', [])

        removeToken()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    // 动态修改权限
    ChangeRoles({commit}, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        userInfo(role).then(response => {
          const data = response
          commit('SET_ROLES', data.roles)

          // commit('SET_ROLES', data.permissions)

          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve()
        })
      })
    },
    // 直接注入token

    InsertToken({commit}, token) {
      commit('SET_TOKEN', token)
      setToken(token)
    }

  }
}

export default user
