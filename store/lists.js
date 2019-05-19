
import firebase from '~/plugins/firebase.js'

export const state = () => ({
  items: [
    {
      id: 1,
      title: 'ログイン機能の実装',
      subtitle: '',
      isClose: false
    },
    {
      id: 2,
      title: '共有機能の作成',
      subtitle: '',
      isClose: false
    },
    {
      id: 3,
      title: 'Firebaseとの連結',
      subtitle: '',
      isClose: false
    },
    {
      id: 4,
      title: 'デザインのFIX',
      isClose: false
    },
    {
      id: 5,
      title: 'アイテム追加機能の実装',
      isClose: false
    },
    {
      id: 6,
      title: 'アイテム削除機能の実装',
      subtitle: '',
      isClose: false
    },
    {
      id: 7,
      title: 'リスト追加機能の実装',
      subtitle: '',
      isClose: false
    },
    {
      id: 8,
      title: 'リスト削除機能の実装',
      subtitle: '',
      isClose: false
    },
  ]
})

export const getters = {
  items (state) {
    return items
  },
  openItems (state) {
    return state.items.filter((item) => {
      return !item.isClose
    })
  },
  closeItems (state) {
    return state.items.filter((item) => {
      return item.isClose
    })
  },
}

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setStates (state, id) {
    const item = state.items.find((item) => {
      return item.id === id
    })
    item.isClose = !item.isClose
  }
}

export const actions = {
  toggleStatesById ({ commit }, id) {
    commit('setStates', id)
  },
}