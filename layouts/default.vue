<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
      fixed
      left
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="user.photoURL">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{user.name}}</v-list-tile-title>
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
        <v-list-tile @click="selectList()">
          <v-list-tile-action>
            <v-icon>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Tasks</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="selectList()">
          <v-list-tile-action>
            <v-icon>assignment_ind</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Assignee</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile v-for="list in lists" @click="selectList(list.id)" :key="list.id">
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{list.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="openAddListDialog">
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
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
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
  components: {
    AppAddListDialog,
    AppAddItemBottomSheet,
  },
  data () {
    return {
      drawer: false,
    }
  },
  computed: {
    ...mapGetters('app', [
      'user'
    ]),
    ...mapGetters('lists', [
      'lists'
    ])
  },
  methods: {
    ...mapActions('app', [
      'openAddListDialog',
      'openAddItemBottomSheet'
    ]),
    ...mapActions('lists', [
      'selectList'
    ])
  },
}
</script>
