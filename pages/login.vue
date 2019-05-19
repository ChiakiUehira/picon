<template>
  <section class="container">
    <v-btn @click="login" dark color="primary">Googleでログイン</v-btn>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  layout: 'login',
  methods : {
    ...mapActions('app', [
      'login'
    ]),
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
