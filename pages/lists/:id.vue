<template>
  <div>
    <app-entry-card
      v-for="entry in currentListOpenEntries"
      :key="entry.id"
      :entry="entry"
    >
    </app-entry-card>
    <v-expansion-panel expand v-if="currentListClosedEntries.length">
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>完了済み</div>
        </template>
        <v-divider />
        <app-entry-card
          v-for="entry in currentListClosedEntries"
          :key="entry.id"
          :entry="entry"
        >
        </app-entry-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppEntryCard from '~/containers/AppEntryCard'
export default {
  components: {
    AppEntryCard
  },
  methods: {
    ...mapActions('app', [
      'setCurrentPageName',
    ]),
    ...mapActions('lists', [
      'setEntryIsCompletedById',
      'setCurrentList',
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
  async created () {
    const id = this.$route.params.id
    this.setCurrentList(id).then((list) => {
      this.setCurrentPageName(list.name)
    })
  },
}
</script>