import {status as statusApi} from '@/api/other'

const status = {
  state: {
    systemStatus: ''
  },
  mutations: {
    SET_STATUS: (state, status) => {
      state.systemStatus = status
    }
  },
  actions: {
    getStatus({commit}) {
      if (!this.state.status.systemStatus) {
        return new Promise((resolve, reject) => {
          statusApi().then(response => {
            console.log('statusApiFirst', response)
            commit('SET_STATUS', response)
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      } else {
        return this.state.status.systemStatus;
      }
    }
  }
}

export default status
