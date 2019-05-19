import auth from '~/plugins/auth'
export default async function ({ store, route, redirect }) {
  return new Promise (async (resolve) => {
    const user = await auth()
    await store.dispatch('app/setUser', user)
    console.log(store.getters['app/isLogged']);
    console.log(route.path);
    if (!store.getters['app/isLogged'] && route.path !== '/login') {
      redirect('/login')
    }
    if (store.getters['app/isLogged'] && route.path === '/login') {
      redirect('/')
    }
    resolve()
  })
}