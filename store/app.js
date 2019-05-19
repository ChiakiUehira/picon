import firebase from '~/plugins/firebase.js'

export const state = () => ({
  token: null,
  isOpenAddListDialog: false,
  isOpenAddItemBottomSheet: false,
})

export const getters = {
  isLogged (state) {
    return state.token !== null
  },
  isOpenAddListDialog (state) {
    return state.isOpenAddListDialog
  },
  isOpenAddItemBottomSheet (state) {
    return state.isOpenAddItemBottomSheet
  }
}

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setIsOpenAddListDialog (state, is) {
    return state.isOpenAddListDialog = is
  },
  setIsOpenAddItemBottomSheet (state, is) {
    return state.isOpenAddItemBottomSheet = is
  },
}

export const actions = {
  login ({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  },
  openAddListDialog ({ commit }) {
    commit('setIsOpenAddListDialog', true)
  },
  closeAddListDialog ({ commit }) {
    commit('setIsOpenAddListDialog', false)
  },
  openAddItemBottomSheet({ commit }) {
    commit('setIsOpenAddItemBottomSheet', true)
  },
  closeAddItemBottomSheet({ commit }) {
    commit('setIsOpenAddItemBottomSheet', false)
  },
}