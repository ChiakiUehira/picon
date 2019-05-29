<template>
  <v-dialog @input="onInput" :value="isOpenAddItemBottomSheet" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="onClose">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>新しいタスクを作成</v-toolbar-title>
      </v-toolbar>
      <v-form>
        <v-container>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="name"
                :disabled="isUpdating"
                box
                label="名前"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="datetime"
                persistent
                lazy
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="datetime"
                    :disabled="isUpdating"
                    box
                    label="日付"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="datetime" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dialog.save(datetime)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
            <v-flex xs12>
              <v-combobox
                v-model="assignee"
                :items="_users"
                chips
                box
                label="担当者"
              >
                <template v-slot:selection="{ item, parent, selected }">
                  <v-chip>
                    <v-avatar>
                      <img :src="item.thumbnail">
                    </v-avatar>
                    @{{ item.username }}
                  </v-chip>
                </template>
                <template v-slot:item="{ item, parent, selected }">
                  <v-chip>
                    <v-avatar>
                      <img :src="item.thumbnail">
                    </v-avatar>
                    @{{ item.username }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="description"
                :disabled="isUpdating"
                auto-grow
                box
                label="詳細"
                rows="10"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :loading="isUpdating"
          depressed
          @click="onCreate"
          color="primary"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      _users: [],
      modal: false,
      isUpdating: false,
      name: '',
      datetime: null,
      description: null,
      assignee: null,
      isCompleted: false,
    }
  },
  computed: {
    ...mapGetters('app', [
      'isOpenAddItemBottomSheet'
    ]),
    ...mapGetters('lists', [
      'currentList'
    ]),
    ...mapGetters('users', [
      'users'
    ])
  },
  methods: {
    ...mapActions('app', [
      'closeAddItemBottomSheet'
    ]),
    ...mapActions('lists', [
      'createEntry'
    ]),
    ...mapActions('users', [
      'getUsers'
    ]),
    onInput () {
      this.closeAddItemBottomSheet()
    },
    onClose () {
      this.name = ''
      this.datetime = ''
      this.assignee = ''
      this.description = ''
      this.closeAddItemBottomSheet()
    },
    onCreate () {
      this.isUpdating = true
      this.createEntry({
        list: this.currentList,
        payload: {
          name: this.name,
          datetime: this.datetime,
          assignee: this.assignee,
          description: this.description
        }
      }).then(() => {
        this.isUpdating = false
        this.name = ''
        this.datetime = ''
        this.assignee = ''
        this.description = ''
        this.closeAddItemBottomSheet()
      })
    }
  },
  async created () {
    this._users = await this.getUsers()
  }
}
</script>