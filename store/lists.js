import { db } from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'
export const state = () => ({
  currentList: null,
  currentEntry: null,
})

export const getters = {
  lists (state, _,rootState) {
    if (rootState.app.currentUser) {
      return rootState.app.currentUser.lists || []
    } else {
      return []
    }
  },
  currentList (state) {
    return state.currentList
  },
  isJoindCurrentList (_, getters) {
    if (getters.currentList) {
      return getters.lists.some((list) => {
        return list.id === getters.currentList.id
      })
    }
  },
  currentListEntries (_, getters) {
    if (getters.currentList) {
      return getters.currentList.entries
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
  currentEntry (state) {
    return state.currentEntry
  },
}

export const mutations = {
  setCurrentEntryId (state, id) {
    state.currentEntryId = id
  }
}

export const actions = {
  setEntryIsCompletedById (_, {entry, isCompleted}) {
    return db.collection('entries').doc(entry.id).update({isCompleted})
  },
  async createList ({getters, rootGetters}, { name }) {
    const newList = await db.collection('lists').add({
      name,
      author: db.doc(`users/${rootGetters['app/currentUser'].id}`),
      entries: [],
      isPublic: true
    })
    const userListRefs = getters.lists.map((list) => {
      return db.doc(`lists/${list.id}`)
    })
    await db.doc(`users/${rootGetters['app/currentUser'].id}`).update({
      lists: [
        ...userListRefs,
        newList
      ]
    })
    return Promise.resolve(newList)
  },
  leaveList ({ getters, rootGetters }, _list) {
    const listRefs = getters.lists
      .filter((list) => list.id !== _list.id )
      .map((list) => db.doc(`lists/${list.id}`))
    return db.doc(`users/${rootGetters['app/currentUser'].id}`).update({
      lists: listRefs
    })
  },
  joinList ({ getters, rootGetters }) {
    const userListRefs = getters.lists.map((list) => {
      return db.doc(`lists/${list.id}`)
    })
    return db.doc(`users/${rootGetters['app/currentUser'].id}`).update({
      lists: [
        ...userListRefs,
        db.doc(`lists/${getters.currentList.id}`)
      ]
    })
  },
  setCurrentList: firestoreAction(({ bindFirestoreRef }, id) => {
    return bindFirestoreRef('currentList', db.collection('lists').doc(id))
  }),
  setCurrentEntry: firestoreAction(({ bindFirestoreRef }, id) => {
    return bindFirestoreRef('currentEntry', db.collection('entries').doc(id))
  }),
  async createEntry ({ rootGetters }, { list, payload }) {
    const entry = await db.collection('entries').add({
      name: payload.name,
      author: db.doc(`users/${rootGetters['app/currentUser'].id}`),
      isCompleted: false,
      datetime: payload.datetime ? new Date(payload.datetime) : null,
      assignee: payload.assignee ? db.doc(`users/${payload.assignee.id}`) : null,
      description: payload.description,
      list: db.doc(`lists/${list.id}`)
    })
    return db.collection('lists').doc(list.id).update({
      entries: [
        entry,
        ...list.entries.map((entity) => db.doc(`entries/${entity.id}`)),
      ]
    })
  },
  async updateEntry (_, {entry, payload}) {
    return db.doc(`entries/${entry.id}`).update({
      assignee: payload.assignee ? db.doc(`users/${payload.assignee.id}`) : null,
      author: payload.author ? db.doc(`users/${payload.author.id}`) : null,
      datetime: payload.datetime ? new Date(payload.datetime) : null,
      description: payload.description,
      isCompleted: payload.isCompleted,
      name: payload.name,
    })
  },
  async removeEntry ({ getters, rootGetters }, _entry) {
    const list = await db.doc(`lists/${_entry.list.id}`).get()
    const entryRefs = list.data().entries
      .filter((entry) => entry.id !== _entry.id )
      .map((entry) => db.doc(`entries/${entry.id}`))
    return db.doc(`lists/${_entry.list.id}`).update({
      entries: entryRefs
    })
  }
}