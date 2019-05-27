<template>
  <v-toolbar fixed app dark color="primary">
    <v-btn v-if="isEntry" @click="onBack" icon>
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-side-icon v-if="!isEntry" @click.stop="openNavigationDrawer"></v-toolbar-side-icon>
    <v-toolbar-title class="font-weight-bold">
      <span v-if="isHome">Home</span>
      <span v-if="isSettings">Settings</span>
      <span v-if="isList || isEntry">{{currentPageName}}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="isEntry" @click="onRemoveEntry" icon>
      <v-icon>delete</v-icon>
    </v-btn>
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
      'currentList',
      'currentEntry'
    ]),
    isHome () {
      return this.currentPageType === 'home'
    },
    isList () {
      return this.currentPageType === 'list'
    },
    isSettings () {
      return this.currentPageType === 'settings'
    },
    isEntry () {
      return this.currentPageType === 'entry'
    }
  },
  methods: {
    onBack () {
      this.$router.push(`/lists/${this.currentEntry.list.id}`)
    },
    onLeaveList () {
      this.leaveList(this.currentList).then(() => {
        this.$router.push(`/${this.username}`)
      })
    },
    onRemoveEntry () {
      this.removeEntry(this.currentEntry).then(() => {
        this.$router.push(`/lists/${this.currentEntry.list.id}`)
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
      'leaveList',
      'removeEntry'
    ])
  }
}
</script>
