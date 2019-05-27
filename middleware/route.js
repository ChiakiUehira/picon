export default ({ store, route }) => {
  store.dispatch('app/setCurrentPageSlug', route.name)
}