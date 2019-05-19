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
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
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
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>やること</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>PICON</v-list-tile-title>
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
      <v-toolbar-title>PICON</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>person_add</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>add_circle</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <nuxt/>
    </v-content>
    <app-add-list-dialog />
    <app-add-item-bottom-sheet />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
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
  methods: {
    ...mapActions('app', [
      'openAddListDialog'
    ])
  },
}
</script>
