import auth from '~/plugins/auth'
export default ({ store, route, redirect }) => {
  return new Promise((resolve) => {
    if (store.getters['app/isLogged']) {
      if (route.name === 'login') {
        redirect('/')
      }
      resolve()
    } else {
      auth().then((user) => {
        if (user) {
          return store.dispatch('app/setUser', user)
        } else {
          redirect('login')
        }
      })
      .then(() => {
        resolve()
      })
    }
  })
}