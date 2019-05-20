import auth from '~/plugins/auth'
export default ({ store, route, redirect }) => {
  if (store.getters['app/isLogged']) {
    if (route.name === 'login') {
      redirect('/')
    }
  } else {
    if (route.name !== 'login') {
      redirect('/login')
    }
  }
}