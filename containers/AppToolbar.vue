<template>
  <v-toolbar fixed app dark color="primary">
    <v-toolbar-side-icon @click.stop="openNavigationDrawer"></v-toolbar-side-icon>
    <v-toolbar-title class="font-weight-bold">
      <span v-if="isHome">Home</span>
      <span v-if="isSettings">Settings</span>
      <span v-if="isList">{{currentPageName}}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="isList" icon>
      <v-icon>person_add</v-icon>
    </v-btn>
    <v-menu v-if="isList" bottom left>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>more_vert</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile @click="onLeaveList">
          <v-list-tile-title class="red--text">リストを退会する</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('app', [
      'username',
      'currentPageName',
      'currentPageType',
      'isOpenNavigationDrawer'
    ]),
    ...mapGetters('lists', [
      'currentList'
    ]),
    isHome () {
      return this.currentPageType === 'home'
    },
    isList () {
      return this.currentPageType === 'list'
    },
    isSettings () {
      return this.currentPageType === 'settings'
    }
  },
  methods: {
    onLeaveList () {
      this.leaveList(this.currentList).then(() => {
        this.$router.push(`/${this.username}`)
      })
    },
    onNavigationDrawer (is) {
      if (is) {
        this.openNavigationDrawer()
      } else {
        this.closeNavigationDrawer()
      }
    },
    ...mapActions('app', [
      'openNavigationDrawer',
      'closeNavigationDrawer',
    ]),
    ...mapActions('lists', [
      'leaveList'
    ])
  }
}
</script>
