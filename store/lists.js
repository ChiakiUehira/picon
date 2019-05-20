import { db } from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'
export const state = () => ({
  currentListId: null,
  lists: []
})

export const getters = {
  currentListId (state) {
    return state.currentListId
  },
  currentList (state, getters) {
    return state.lists.find((item) => {
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
  lists (state) {
    return state.lists
  },
  currentListOpenEntries (_, getters) {
    if (getters.currentListEntries.length) {
      return getters.currentListEntries.filter((entry) => {
        return !entry.isCompleted
      })
    }
  },
  currentListClosedEntries (_, getters) {
    if (getters.currentListEntries.length) {
      return getters.currentListEntries.filter((entry) => {
        return entry.isCompleted
      })
    }
  },
}

export const mutations = {
  setCurrentListId (state, id) {
    state.currentListId = id
  }
}

export const actions = {
  bindLists: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef('lists', db.collection('lists'))
  }),
  setEntryIsCompletedById (_, {id, is}) {
    return db.collection('entries').doc(id).update({isCompleted: is})
  },
  setCurrentList ({commit}, id) {
    commit('setCurrentListId', id)
  },
}