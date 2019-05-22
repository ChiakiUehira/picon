<template>
  <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>アカウントの作成</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-img v-if="thumbnail" :src="thumbnail" alt=""></v-img>
                <v-form>
                  <v-text-field v-model="username" label="ユーザーネーム" type="text"></v-text-field>
                  <v-text-field v-model="displayName" label="表示名" type="text"></v-text-field>
                  <v-text-field v-model="email" label="email" type="email"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="onCreate" color="primary">作成</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'
export default {
  layout: 'opening',
  data () {
    return {
      uuid: '',
      displayName: '',
      email: '',
      thumbnail: '',
      username: '',
    }
  },
  methods: {
    ...mapActions('app', [
      'createAccount'
    ]),
    onCreate () {
      if (this.username) {
        this.createAccount({
          uuid: this.uuid,
          username: this.username,
          thumbnail :this.thumbnail,
          displayName :this.displayName,
          email :this.email,
          thumbnail :this.thumbnail,
        }).then(() => {
          window.location.href = "/"
        })
      }
    }
  },
  created() {
    const user = firebase.auth().currentUser
    this.uuid = user.uid
    this.displayName = user.displayName
    this.email = user.email
    this.thumbnail = user.photoURL
  },
}
</script>