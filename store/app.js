import { firebase, db } from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

export const state = () => ({
  currentUser: null,
  hasAccount: false,
  isLoading: true,
  isOpenAddListDialog: false,
  isOpenAddItemBottomSheet: false,
  isOpenNavigationDrawer: false,
  currentPageName: 'Tasks',
  currentPageSlug: ''
})

export const getters = {
  hasAccount (state) {
    return state.hasAccount
  },
  currentUser (state) {
    return state.currentUser
  },
  username (state) {
    return state.currentUser.username
  },
  isLogged (state) {
    return firebase.auth().currentUser !== null
  },
  isLoading (state) {
    return state.isLoading
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
  },
  currentPageType (state) {
    switch (state.currentPageSlug) {
      case ':id':
        return 'home'
        break;
      case 'lists-:id':
        return 'list'
        break;
      case 'entries-:id':
        return 'entry'
        break;
    }
  }
}

export const mutations = {
  setHasAccount (state, is) {
    state.hasAccount = is
  },
  setIsLoading (state, is) {
    state.isLoading = is
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
  },
  setCurrentPageSlug (state, slug) {
    state.currentPageSlug = slug
  }
}

export const actions = {
  async setHasAccount ({ commit }, uuid) {
    const doc = await db.collection('users').doc(uuid).get()
    commit('setHasAccount', doc.exists)
  },
  createAccount (_, payload) {
    return db.collection('users').doc(payload.uuid).set({
      displayName: payload.displayName,
      email: payload.email,
      thumbnail: payload.thumbnail,
      username: payload.username,
      lists: [],
    })
  },
  login () {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  },
  logout () {
    firebase.auth().signOut().then(() => {

    })
  },
  setCurrentUser: firestoreAction(({ bindFirestoreRef }, uuid) => {
    return bindFirestoreRef('currentUser', db.collection('users').doc(uuid))
  }),
  openLoading ({ commit }) {
    commit('setIsLoading', true)
  },
  closeLoading ({ commit }) {
    commit('setIsLoading', false)
  },
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
  },
  setCurrentPageSlug ({ commit }, slug) {
    commit('setCurrentPageSlug', slug)
  }
}