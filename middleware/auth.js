export default ({ store, route, redirect }) => {
  const redirectPath = route.path
  if (store.getters['app/isLogged']) {
    if (!store.getters['app/hasAccount'] && route.name !== 'opening') {
      redirect('/opening?redirect=' + redirectPath)
    }
    if (route.name === 'login') {
      redirect(route.query.redirect || '/')
    }
  }
  if (!store.getters['app/isLogged'] && route.name !== 'login') {
    redirect('/login?redirect=' + redirectPath)
  }
}