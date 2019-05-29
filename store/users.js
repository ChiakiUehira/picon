import { firebase, db } from '~/plugins/firebase'

export const state = () => ({
  users: null,
})

export const getters = {
  users (state) {
    return state.users
  }
}

export const mutations = {
  setUsers (state, users) {
    state.users = users
  }
}

export const actions = {
  async getUserByUsername (_, username) {
    return db.collection('users').where('username', '==', username).limit(1).get()
  },
  async getUsers ({ commit }) {
    const snapshot = await db.collection('users').get()
    const users = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    return users
    // commit('setUsers', users)
  }
}