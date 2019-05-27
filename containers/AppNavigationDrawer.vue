<template>
  <v-navigation-drawer
    app
    fixed
    left
    @input="onNavigationDrawer"
    :value="isOpenNavigationDrawer"
  >
    <v-toolbar flat>
      <v-list class="pa-0">
        <v-list-tile avatar v-if="currentUser">
          <v-list-tile-avatar>
            <img :src="currentUser.thumbnail">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{currentUser.displayName}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click="logout">
              <v-icon>settings</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list class="pt-0">
      <v-list-tile @click="$router.push(`/${username}`)">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>HOME</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile v-for="list in lists" @click="onSelectList(list.id, list.name)" :key="list.id">
        <v-list-tile-action>
          <v-icon>list</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{list.name}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="onAddList">
        <v-list-tile-action>
          <v-icon>add</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>新しいリストを作成</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
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
      'username',
      'currentUser',
      'currentPageName',
      'isOpenNavigationDrawer'
    ]),
    ...mapGetters('lists', [
      'lists'
    ])
  },
  methods: {
    onNavigationDrawer (is) {
      if (is) {
        this.openNavigationDrawer()
      } else {
        this.closeNavigationDrawer()
      }
    },
    onSelectList (id, name) {
      this.closeNavigationDrawer()
      this.setCurrentPageName(name)
      this.$router.push('/lists/' + id)
    },
    onAddList () {
      this.closeNavigationDrawer()
      setTimeout(() => {
        this.openAddListDialog()
      }, 100);
    },
    ...mapActions('app', [
      'logout',
      'setCurrentPageName',
      'openNavigationDrawer',
      'closeNavigationDrawer',
      'openAddListDialog',
    ])
  },
}
</script>