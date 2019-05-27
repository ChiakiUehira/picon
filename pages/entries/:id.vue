<template>
  <div v-if="currentEntry">
    <v-list>
      <v-subheader>General</v-subheader>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-checkbox @click.stop="onChange" :input-value="currentEntry.isCompleted"></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{currentEntry.name}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile ripple @click="">
        <v-list-tile-action>
          <v-icon>description</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <div v-if="currentEntry.description">{{currentEntry.description}}</div>
          <div v-else class="caption">詳細を追加(未実装)</div>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile ripple @click="">
        <v-list-tile-action>
          <v-icon>av_timer</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-chip v-if="currentEntry.datetime">{{currentEntry.datetime}}</v-chip>
          <div v-else class="caption">日付を追加(未実装)</div>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile ripple @click="">
        <v-list-tile-action>
          <v-icon>assignment_ind</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-chip v-if="currentEntry.assignee">
            <v-avatar>
              <img :src="currentEntry.assignee.thumbnail">
            </v-avatar>
            {{ currentEntry.assignee.displayName }}
          </v-chip>
          <div v-else class="caption">担当者を追加(未実装)</div>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>create</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-chip v-if="currentEntry.author">
            <v-avatar>
              <img :src="currentEntry.author.thumbnail">
            </v-avatar>
            {{ currentEntry.author.displayName }}
          </v-chip>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('app', [
      'setCurrentPageName',
    ]),
    ...mapActions('lists', [
      'setCurrentEntry',
      'setEntryIsCompletedById'
    ]),
    onChange () {
      if (this.isJoindCurrentList) {
        setTimeout(() => {
          this.setEntryIsCompletedById({
            entry: this.currentEntry,
            isCompleted: !this.currentEntry.isCompleted
          })
        }, 300);
      }
    },
  },
  computed: {
    ...mapGetters('lists', [
      'currentEntry',
      'isJoindCurrentList'
    ])
  },
  created () {
    const id = this.$route.params.id
    this.setCurrentEntry(id).then(entry => {
      this.setCurrentPageName(entry.list.name)
    })
  },
}
</script>