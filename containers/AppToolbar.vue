<template>
  <v-toolbar fixed app dark color="primary">
    <v-toolbar-side-icon @click.stop="openNavigationDrawer"></v-toolbar-side-icon>
    <v-toolbar-title>
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
        <v-list-tile>
          <v-list-tile-title>リストを削除する</v-list-tile-title>
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
      'currentPageName',
      'currentPageType',
      'isOpenNavigationDrawer'
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
    ])
  },
  created() {
      console.log(this.$route.name);
  },
}
</script>
