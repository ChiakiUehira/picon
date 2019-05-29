<template>
  <div v-if="currentEntry">
    <v-card>
      <v-subheader>General</v-subheader>
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
                :items="users"
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
              <v-combobox
                v-model="author"
                chips
                label="作成者"
                box
                disabled
              >
                <template v-slot:selection>
                  <v-chip>
                    <v-avatar>
                      <img :src="author.thumbnail">
                    </v-avatar>
                    @{{ author.username }}
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
          @click="onUpdate"
          color="primary"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      entry: null,
      modal: false,
      isUpdating: false,
      users: [],
      name: '',
      datetime: null,
      description: null,
      author: null,
      assignee: null,
      isCompleted: false,
    }
  },
  methods: {
    ...mapActions('app', [
      'setCurrentPageName',
    ]),
    ...mapActions('lists', [
      'setCurrentEntry',
      'setEntryIsCompletedById',
      'updateEntry'
    ]),
    ...mapActions('users', [
      'getUsers',
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
    onUpdate() {
      this.isUpdating = true
      this.updateEntry({
        entry: this.entry,
        payload: {
          name: this.name,
          datetime: this.datetime,
          description: this.description,
          isCompleted: this.isCompleted,
          author: this.author,
          assignee: this.assignee,
        }
      }).then(() => {
        this.isUpdating = false
      })
    }
  },
  computed: {
    ...mapGetters('lists', [
      'currentEntry',
      'isJoindCurrentList'
    ])
  },
  async created () {
    const id = this.$route.params.id
    this.users = await this.getUsers()
    this.setCurrentEntry(id).then(entry => {
      this.entry = entry
      this.name = entry.name
      this.datetime = entry.datetime ? dayjs(new Date(entry.datetime.toDate())).format('YYYY-MM-DD') : null
      this.description = entry.description
      this.isCompleted = entry.isCompleted
      this.author = entry.author
      this.assignee = entry.assignee
      this.setCurrentPageName(entry.list.name)
    })
  },
}
</script>