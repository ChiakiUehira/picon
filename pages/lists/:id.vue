<template>
  <div>
    <v-list class="pa-0">
      <template v-for="item in currentListOpenEntries" three-line>
        <div :key="item.id">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox @change="onCheckbox(item.id, !item.isCompleted)" :input-value="item.isCompleted"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content @click="toDetail(item.id)">
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </div>
      </template>
    </v-list>
    <v-expansion-panel expand>
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>完了済み</div>
        </template>
        <v-list>
          <template v-for="item in currentListClosedEntries">
            <v-divider></v-divider>
            <div :key="item.id">
              <v-list-tile @click="">
                <v-list-tile-action>
                  <v-checkbox @change="onCheckbox(item.id, !item.isCompleted)" :input-value="item.isCompleted"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content @click="toDetail(item.id)">
                  <v-list-tile-title v-html="item.name"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </div>
          </template>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
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