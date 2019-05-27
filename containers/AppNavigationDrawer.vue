<template>
  <v-navigation-drawer
    app
    fixed
    left
    @input="onNavigationDrawer"
    :value="isOpenNavigationDrawer"
  >
    <v-img v-if="currentUser" :aspect-ratio="16/9" :src="currentUser.thumbnail">
      <v-layout pa-2 column fill-height class="lightbox white--text">
        <v-spacer></v-spacer>
        <v-flex shrink>
          <div class="subheading">{{currentUser.displayName}}</div>
          <div class="body-1">{{currentUser.email}}</div>
        </v-flex>
      </v-layout>
    </v-img>
    <v-list class="pt-0">
      <v-list-tile @click="$router.push(`/${username}`)">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="font-weight-regular">HOME</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-subheader>Lists</v-subheader>
      <v-list-tile v-for="list in lists" @click="onSelectList(list.id, list.name)" :key="list.id">
        <v-list-tile-action>
          <v-icon>list</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="font-weight-regular">{{list.name}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="onAddList">
        <v-list-tile-action>
          <v-icon>add</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="font-weight-regular">新しいリストを作成</v-list-tile-title>
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
      this.$router.push('/lists/' + id)
    },
    onAddList () {
      this.closeNavigationDrawer()
      setTimeout(() => {
        this.openAddListDialog()
      }, 100);
    },
    ...mapActions('app', [
      'openNavigationDrawer',
      'closeNavigationDrawer',
      'openAddListDialog',
    ])
  },
}
</script>