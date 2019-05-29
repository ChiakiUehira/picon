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
              <v-autocomplete
                v-model="assignee"
                :disabled="isUpdating"
                :items="[]"
                box
                chips
                label="担当者"
                item-text="name"
                item-value="name"
              >
                <!-- <template v-slot:selection="data">
                  <v-chip
                    :selected="data.selected"
                    close
                    class="chip--select-multi"
                    @input="remove(data.item)"
                  >
                    <v-avatar>
                      <img :src="data.item.avatar">
                    </v-avatar>
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-avatar>
                      <img :src="data.item.avatar">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </template>
                </template> -->
              </v-autocomplete>
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
                rows="3"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!isUpdating"
          :loading="isUpdating"
          depressed
          @click="isUpdating = true"
          color="primary"
        >
          Update Now
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      modal: false,
      isUpdating: false,
      data: {
        item: []
      },
      name: '',
      datetime: '',
      description: '',
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
      this.name = entry.name
      this.datetime = entry.datetime
      this.description = entry.description
      this.isCompleted = entry.isCompleted
      this.author = entry.author
      this.assignee = entry.assignee
      this.setCurrentPageName(entry.list.name)
    })
  },
}
</script>