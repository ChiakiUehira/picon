<template>
  <v-bottom-sheet @input="onInput" :value="isOpenAddItemBottomSheet">
    <v-card>
      <v-card-text>
        <v-text-field
          v-model="name"
          label="新しいタスクを追加"
          required
        ></v-text-field>
      </v-card-text>
      <v-list-tile ripple @click="">
        <v-list-tile-action>
          <v-icon>description</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <div class="caption">詳細を追加(未実装)</div>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile ripple @click="">
        <v-list-tile-action>
          <v-icon>av_timer</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <div class="caption">日付を追加(未実装)</div>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile ripple @click="">
        <v-list-tile-action>
          <v-icon>assignment_ind</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <div class="caption">担当者を追加(未実装)</div>
        </v-list-tile-content>
      </v-list-tile>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="onCreate" color="primary">作成</v-btn>
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('app', [
      'closeAddItemBottomSheet'
    ]),
    ...mapActions('lists', [
      'createEntry'
    ]),
    onInput () {
      this.closeAddItemBottomSheet()
    },
    onCreate () {
      this.createEntry({
        list: this.currentList,
        payload: {
          name: this.name,
          datetime: null,
          assignee: null,
          description: null
        }
      }).then(() => {
        this.name = ''
        this.closeAddItemBottomSheet()
      })
    }
  },
  computed: {
    ...mapGetters('app', [
      'isOpenAddItemBottomSheet'
    ]),
    ...mapGetters('lists', [
      'currentList'
    ])
  },
  data () {
    return {
      name: ''
    }
  },
}
</script>