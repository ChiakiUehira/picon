<template>
  <div>
    <v-list subheader two-line class="pa-0">
      <v-subheader>一覧</v-subheader>
      <v-divider></v-divider>
      <template v-for="item in currentListOpenEntries">
        <div :key="item.title">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox @change="onCheckbox(item.id, !item.isCompleted)" :input-value="item.isCompleted"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content @click="toDetail(item.id)">
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </div>
      </template>
    </v-list>
    <v-list　v-if="currentListClosedEntries" subheader two-line>
      <v-subheader>完了</v-subheader>
      <v-divider></v-divider>
      <template v-for="item in currentListClosedEntries">
        <div :key="item.title">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox @change="onCheckbox(item.id, !item.isCompleted)" :input-value="item.isCompleted"></v-checkbox>
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
      'setEntryIsCompletedById',
      'setCurrentList'
    ]),
    onCheckbox (id, is) {
      this.setEntryIsCompletedById({id, is})
    },
    toDetail (id) {
      this.$router.push('/entries/' + id)
    }
  },
  computed: {
    ...mapGetters('lists', [
      'currentListOpenEntries',
      'currentListClosedEntries',
    ])
  },
  created () {
    const id = this.$route.params.id
    this.setCurrentList(id)
  },
}
</script>