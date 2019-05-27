<template>
  <div>
    <v-card flat ripple @click="onDetail">
      <v-layout align-center class="pa-1 pl-3 pr-3">
        <div class="mr-2">
          <v-checkbox @click.stop="onChange" :input-value="entry.isCompleted"></v-checkbox>
        </div>
        <div class="overflow-hidden mr-3">
          <div class="font-weight-medium subheading mb-1">{{entry.name}}</div>
          <div v-if="entry.description" class="caption">{{entry.description}}</div>
        </div>
        <v-spacer />
        <v-avatar v-if="entry.author">
          <img :src="entry.author.thumbnail">
        </v-avatar>
      </v-layout>
      <v-chip v-if="entry.datetime">{{entry.datetime}}</v-chip>
    </v-card>
    <v-divider />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    entry: {
      required: true,
    }
  },
  computed: {
    ...mapGetters('lists', [
      'isJoindCurrentList'
    ])
  },
  methods: {
    ...mapActions('lists', [
      'setEntryIsCompletedById',
    ]),
    onChange () {
      if (this.isJoindCurrentList) {
        setTimeout(() => {
          this.setEntryIsCompletedById({
            entry: this.entry,
            isCompleted: !this.entry.isCompleted
          })
        }, 300)
      }
    },
    onDetail () {
      this.$router.push('/entries/' + this.entry.id)
    }
  },
}
</script>
