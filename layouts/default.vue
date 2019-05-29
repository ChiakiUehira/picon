<template>
  <v-app>
    <app-navigation-drawer />
    <app-toolbar />
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
    <v-btn
      v-if="currentPageType !== 'home' && isJoindCurrentList"
      fixed
      fab
      bottom
      right
      color="primary"
      @click="openAddItemBottomSheet"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <app-add-list-dialog />
    <app-add-item-dialog />
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AppNavigationDrawer from '~/containers/AppNavigationDrawer'
import AppToolbar from '~/containers/AppToolbar'
import AppAddListDialog from '~/containers/AppAddListDialog'
import AppAddItemDialog from '~/containers/AppAddItemDialog'
export default {
  components: {
    AppNavigationDrawer,
    AppToolbar,
    AppAddListDialog,
    AppAddItemDialog,
  },
  computed: {
    ...mapGetters('app', [
      'currentPageType'
    ]),
    ...mapGetters('lists', [
      'isJoindCurrentList'
    ])
  },
  methods: {
    ...mapActions('app', [
      'openAddItemBottomSheet',
    ])
  },
}
</script>
