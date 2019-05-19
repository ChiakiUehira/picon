<template>
  <div>
    <v-list subheader two-line class="pa-0">
      <v-subheader>一覧</v-subheader>
      <v-divider></v-divider>
      <template v-for="item in openItems">
        <div :key="item.title">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox @change="toggleStatesById(item.id)" :input-value="item.isClose"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content @click="toDetail(item.id)">
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </div>
      </template>
    </v-list>
    <v-list　v-if="this.closeItems.length" subheader two-line>
      <v-subheader>完了</v-subheader>
      <v-divider></v-divider>
      <template v-for="item in closeItems">
        <div :key="item.title">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox @change="toggleStatesById(item.id)" :input-value="item.isClose"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content @click="toDetail(item.id)">
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
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
    ]),
    toDetail (id) {
      this.$router.push('/items/' + id)
    }
  },
  computed: {
    ...mapGetters('lists', [
      'openItems',
      'closeItems',
    ])
  },
}
</script>