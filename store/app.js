import firebase from '~/plugins/firebase.js'

export const state = () => ({
  token: null,
  isOpenAddListDialog: false,
})

export const getters = {
  isLogged (state) {
    return state.token !== null
  },
  isOpenAddListDialog (state) {
    return state.isOpenAddListDialog
  }
}

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setIsOpenAddListDialog (state, is) {
    return state.isOpenAddListDialog = is
  }
}

export const actions = {
  login ({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider).then((result) => {
      const token = result.credential.accessToken
      commit('setToken', token)
    }).catch((error) => {

    });
  },
  openAddListDialog ({ commit }) {
    commit('setIsOpenAddListDialog', true)
  },
  closeAddListDialog ({ commit }) {
    commit('setIsOpenAddListDialog', false)
  }
}