import firebase from '~/plugins/firebase.js'

export const state = () => ({
  token: null
})

export const getters = {
  isLogged (state) {
    return state.token !== null
  }
}

export const mutations = {
  setToken (state, token) {
    state.token = token
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
  }
}