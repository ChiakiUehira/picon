<template>
  <v-app>
    <app-navigation-drawer />
    <app-toolbar />
    <v-content>
      <nuxt/>
    </v-content>
    <v-btn
      v-if="currentPageType !== 'home' && isJoinCurrentList"
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
    <app-add-item-bottom-sheet />
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AppNavigationDrawer from '~/containers/AppNavigationDrawer'
import AppToolbar from '~/containers/AppToolbar'
import AppAddListDialog from '~/containers/AppAddListDialog'
import AppAddItemBottomSheet from '~/containers/AppAddItemBottomSheet'
export default {
  components: {
    AppNavigationDrawer,
    AppToolbar,
    AppAddListDialog,
    AppAddItemBottomSheet,
  },
  computed: {
    ...mapGetters('app', [
      'currentPageType'
    ]),
    ...mapGetters('lists', [
      'isJoinCurrentList'
    ])
  },
  methods: {
    ...mapActions('app', [
      'openAddItemBottomSheet',
    ])
  },
}
</script>
