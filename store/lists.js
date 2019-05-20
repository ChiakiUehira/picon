import { db } from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'
export const state = () => ({
  currentListId: null,
  currentEntryId: null,
  lists: []
})

export const getters = {
  lists (state) {
    return state.lists.lists || []
  },
  currentListId (state) {
    return state.currentListId
  },
  currentList (state, getters) {
    return getters.lists.find((item) => {
      return item.id === getters.currentListId
    })
  },
  currentListEntries (_, getters) {
    if (getters.currentList) {
      return getters.currentList.entryRefs
    } else {
      return []
    }
  },
  currentListOpenEntries (_, getters) {
    return getters.currentListEntries.filter((entry) => {
      return !entry.isCompleted
    })
  },
  currentListClosedEntries (_, getters) {
    return getters.currentListEntries.filter((entry) => {
      return entry.isCompleted
    })
  },
  currentEntryId (state) {
    return state.currentEntryId
  },
  currentEntry (_, getters) {
    return getters.currentListEntries.find((item) => {
      return item.id === getters.currentEntryId
    })
  },
}

export const mutations = {
  setCurrentListId (state, id) {
    state.currentListId = id
  },
  setCurrentEntryId (state, id) {
    state.currentEntryId = id
  }
}

export const actions = {
  bindLists: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef('lists', db.collection('users').doc('uZSs3sNkfOTUp3DGOsNi6QdhCZF3'))
  }),
  setEntryIsCompletedById (_, {id, is}) {
    return db.collection('entries').doc(id).update({isCompleted: is})
  },
  setCurrentList ({commit}, id) {
    commit('setCurrentListId', id)
  },
  setCurrentEntryId ({commit}, id) {
    commit('setCurrentEntryId', id)
  },
}