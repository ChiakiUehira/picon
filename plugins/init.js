import auth from '~/plugins/auth'
export default async ({ store, redirect }) => {
  const user = await auth()
  if (user) {
    await store.dispatch('app/setHasAccount', user.uid)
    await store.dispatch('app/setCurrentUser', user.uid)
  }
}