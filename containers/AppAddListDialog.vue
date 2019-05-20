<template>
  <v-dialog v-model="isOpenAddListDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closeAddListDialog">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>新しいリストを作成</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-text-field v-model="name" label="リスト名" required></v-text-field>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" flat @click="closeAddListDialog">キャンセル</v-btn>
        <v-btn color="primary" flat @click="onCreate">作成</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        name: ''
      }
    },
    methods: {
      onCreate () {
        this.createList({ name: this.name })
        this.name = ''
        this.closeAddListDialog()
      },
      ...mapActions('app', [
        'closeAddListDialog'
      ]),
      ...mapActions('lists', [
        'createList',
    ])
    },
    computed: {
      ...mapGetters('app', [
        'isOpenAddListDialog'
      ])
    },
  }
</script>