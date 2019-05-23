<template>
  <v-card>
    <v-card-title>
      <div>
        <div class="headline">{{currentEntry.name}}</div>
        <span>{{currentEntry.description}}</span>
      </div>
    </v-card-title>
    <v-card-content>
      <v-list>
        <v-divider></v-divider>
        <v-list-tile>
          <v-list-tile-content>
            <v-checkbox @change="onCheckbox(currentEntry.id, !currentEntry.isCompleted)" :input-value="currentEntry.isCompleted"></v-checkbox>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>author : {{currentEntry.author}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>assignee : {{currentEntry.assignee}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile>
          <v-spacer></v-spacer>
          <v-btn color="error">削除</v-btn>
        </v-list-tile>
      </v-list>
    </v-card-content>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('lists', [
      'setCurrentEntryId',
      'setEntryIsCompletedById'
    ]),
    onCheckbox (id, is) {
      this.setEntryIsCompletedById({id, is})
    },
  },
  computed: {
    ...mapGetters('lists', [
      'currentEntry',
    ])
  },
  created () {
    const id = this.$route.params.id
    this.setCurrentEntryId(id)
  },
}
</script>