<template>
  <v-app>
    <v-navigation-drawer
      app
      fixed
      left
      @input="onNavigationDrawer"
      :value="isOpenNavigationDrawer"
    >
      <v-toolbar flat>
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="user.thumbnail">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{user.displayName}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon>
                <v-icon>settings</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list class="pt-0">
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Tasks</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>assignment_ind</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Assignee</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>date_range</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Calendar</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile v-for="list in lists" @click="onSelectList(list.id)" :key="list.id">
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
    <v-toolbar fixed app dark color="primary">
      <v-toolbar-side-icon @click.stop="openNavigationDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>Tasks</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>person_add</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <nuxt/>
    </v-content>
    <v-btn
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
import AppAddListDialog from '~/containers/AppAddListDialog'
import AppAddItemBottomSheet from '~/containers/AppAddItemBottomSheet'
export default {
  created() {
    this.bindLists()
  },
  components: {
    AppAddListDialog,
    AppAddItemBottomSheet,
  },
  computed: {
    ...mapGetters('app', [
      'user',
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
    onSelectList (id) {
      this.closeNavigationDrawer()
      this.$router.push('/lists/' + id)
    },
    onAddList () {
      this.closeNavigationDrawer()
      setTimeout(() => {
        this.openAddListDialog()
      }, 100);
    },
    ...mapActions('lists', [
      'bindLists'
    ]),
    ...mapActions('app', [
      'openNavigationDrawer',
      'closeNavigationDrawer',
      'openAddListDialog',
      'openAddItemBottomSheet',
    ]),
  },
}
</script>
