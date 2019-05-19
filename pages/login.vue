<template>
  <section class="container">
    <el-button @click="login" type="primary" icon="el-icon-user-solid">Googleでログイン</el-button>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
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
