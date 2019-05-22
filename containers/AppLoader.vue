<template>
  <div v-if="isLoading" class="app-loeader">
     <v-progress-circular
      indeterminate
      color="white"
    ></v-progress-circular>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('app', [
      'isLoading'
    ])
  },
  methods: {
    ...mapActions('app', [
      'openLoading',
      'closeLoading',
    ]),
    start () {
      this.openLoading()
    },
    finish () {
      this.closeLoading()
    }
  }
}
</script>

<style scoped>
.app-loeader {
  background-color: #1976d2;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
