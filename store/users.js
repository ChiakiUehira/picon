import { firebase, db } from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

export const actions = {
  async getUserByUsername (_, username) {
    return db.collection('users').where('username', '==', username).limit(1).get()
  },
  async getUsers () {
    const snapshot = await db.collection('users').get()
    return snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
  }
}