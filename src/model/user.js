// @/model/User.js
import { Model } from '@vuex-orm/core'

export default class User extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'users'

  // list all the fields (schema)
  static fields() {
    return {
      id: this.increment(), //  id increases automatically
      name: this.increment() // define as a string and the defualt value is ''
    }
  }
}
