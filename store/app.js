import { firebase, db } from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

export const state = () => ({
  user: null,
  isOpenAddListDialog: false,
  isOpenAddItemBottomSheet: false,
  isOpenNavigationDrawer: false,
  currentPageName: 'Tasks'
})

export const getters = {
  user (state) {
    return state.user
  },
  isLogged (state) {
    return state.user !== null
  },
  isOpenAddListDialog (state) {
    return state.isOpenAddListDialog
  },
  isOpenAddItemBottomSheet (state) {
    return state.isOpenAddItemBottomSheet
  },
  isOpenNavigationDrawer (state) {
    return state.isOpenNavigationDrawer
  },
  currentPageName (state) {
    return state.currentPageName
  }
}

export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setIsOpenNavigationDrawer (state, is) {
    state.isOpenNavigationDrawer = is
  },
  setIsOpenAddListDialog (state, is) {
    state.isOpenAddListDialog = is
  },
  setIsOpenAddItemBottomSheet (state, is) {
    state.isOpenAddItemBottomSheet = is
  },
  setCurrentPageName (state, name) {
    state.currentPageName = name
  }
}

export const actions = {
  login () {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  },
  setUser: firestoreAction(({ bindFirestoreRef }, user) => {
    return bindFirestoreRef('user', db.collection('users').doc(user.uid))
  }),
  toggleNavigationDrawer ({ getters, commit }) {
    commit('setIsOpenNavigationDrawer', !getters.isOpenNavigationDrawer)
  },
  openNavigationDrawer ({ commit }) {
    commit('setIsOpenNavigationDrawer', true)
  },
  closeNavigationDrawer ({ commit }) {
    commit('setIsOpenNavigationDrawer', false)
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
  setCurrentPageName ({ commit }, name) {
    commit('setCurrentPageName', name)
  }
}