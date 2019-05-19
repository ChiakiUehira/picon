export const state = () => ({
  currentListId: null,
  lists: [
    {
      id: 1,
      name: 'Picon',
      entries: [
        {
          id: 1,
          title: 'ログイン機能の実装',
          description: '',
          date: '',
          isClose: true
        },
        {
          id: 2,
          title: '共有機能の作成',
          description: '',
          date: '',
          isClose: false
        },
        {
          id: 3,
          title: 'Firebaseとの連結',
          description: '',
          date: '',
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
          description: '',
          date: '',
          isClose: false
        },
        {
          id: 7,
          title: 'リスト追加機能の実装',
          description: '',
          date: '',
          isClose: false
        },
        {
          id: 8,
          title: 'リスト削除機能の実装',
          description: '',
          date: '',
          isClose: false
        },
      ]
    }
  ]
})

export const getters = {
  currentList (state) {
    return state.lists.find((item) => {
      return item.id === state.currentListId
    })
  },
  currentListEntries (state) {
    const currentList = state.lists.find((item) => {
      return item.id === state.currentListId
    })
    return currentList ? currentList.entries : []
  },
  lists (state) {
    return state.lists.map((list) => {
      return {
        name: list.name
      }
    })
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
  },
  setCurrentListId (state, id) {
    state.currentListId = id
  }
}

export const actions = {
  toggleStatesById ({ commit }, id) {
    commit('setStates', id)
  },
  selectList ({commit}, id) {
    commit('setCurrentListId', id)
  }
}