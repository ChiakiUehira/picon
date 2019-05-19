import auth from '~/plugins/auth'
export default async function ({ store, route, redirect }) {
  return new Promise (async (resolve) => {
    const user = await auth()
    await store.dispatch('app/setUser', user)
    if (!store.getters['app/isLogged'] && route.name !== 'login') {
      redirect('/login')
    }
    if (store.getters['app/isLogged'] && route.name === 'login') {
      redirect('/')
    }
    resolve()
  })
}