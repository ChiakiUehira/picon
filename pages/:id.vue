<template>
  <div v-if="user">
    <v-img :aspect-ratio="16/9" :src="user.thumbnail">
      <v-layout pa-2 column fill-height class="lightbox white--text">
        <v-spacer></v-spacer>
        <v-flex shrink>
          <div class="subheading">{{user.displayName}}</div>
          <div class="body-1">@{{user.username}}</div>
        </v-flex>
      </v-layout>
    </v-img>
    <v-list class="pt-0">
      <v-subheader>Lists</v-subheader>
      <v-list-tile v-for="list in lists" @click="onList(list)" :key="list.data().id">
        <v-list-tile-action>
          <v-icon>list</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="font-weight-regular">{{list.data().name}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      user: null,
      lists: null,
    }
  },
  methods: {
    ...mapActions('users', [
      'getUserByUsername'
    ]),
    onList (list) {
      this.$router.push('/lists/' + list.id)
    }
  },
  async created() {
    const username = this.$route.params.id
    const snapshot = await this.getUserByUsername(username)
    if (snapshot.empty) {
      console.log('NOT FOUND');
    } else {
      const [doc] = snapshot.docs
      this.user = doc.data()
      this.lists = await Promise.all(this.user.lists.map((list) => {
        return list.get()
      }))
    }
  },
}
</script>