import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

import auth from './modules/auth'
import user from './modules/user'
import role from './modules/role'
import permission from './modules/permission'
import code from './modules/code'
import codeCategory from './modules/codeCategory'
import music from './modules/music'
import musicCategory from './modules/musicCategory'
import film from './modules/film'
import filmCategory from './modules/filmCategory'
import book from './modules/book'
import bookCategory from './modules/bookCategory'
import file from './modules/file'

Vue.use(Vuex)

const state = {}

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    auth,
    user,
    role,
    permission,
    code,
    codeCategory,
    music,
    musicCategory,
    film,
    filmCategory,
    book,
    bookCategory,
    file
  },
  strict: debug
  // strict: false
})
