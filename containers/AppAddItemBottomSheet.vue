<template>
  <v-bottom-sheet @input="onInput" :value="isOpenAddItemBottomSheet">
    <v-card>
      <v-card-text>
        <v-text-field
          v-model="name"
          label="タスク"
          required
        ></v-text-field>
      </v-card-text>
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
          datatime: null,
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