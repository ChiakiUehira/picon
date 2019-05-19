<template>
  <div>
    <v-list subheader two-line class="pa-0">
      <v-subheader>General</v-subheader>
      <template v-for="item in openItems">
        <div :key="item.title">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox @change="toggleStatesById(item.id)" :input-value="item.isClose"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content to="/1">
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </div>
      </template>
    </v-list>
    <v-list subheader two-line>
      <v-subheader>完了</v-subheader>
      <template v-for="item in closeItems">
        <div :key="item.title">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox @change="toggleStatesById(item.id)" :input-value="item.isClose"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content to="/1">
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </div>
      </template>
    </v-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('lists', [
      'toggleStatesById'
    ])
  },
  computed: {
    ...mapGetters('lists', [
      'openItems',
      'closeItems',
    ])
  },
}
</script>