import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import common from './modules/common'
import getters from './getters'
import fullScreen from './modules/fullScreen'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import VuexORM from '@vuex-orm/core'
// import User from '@/model/user'
import status from './modules/status'

Vue.use(Vuex)

const database = new VuexORM.Database()

// database.register(User)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    common,
    fullScreen,
    permission,
    tagsView,
    status
  },
  getters,
  plugins: [VuexORM.install(database)]
})

export default store
