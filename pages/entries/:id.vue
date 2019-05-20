<template>
  <div>
    {{currentEntry}}
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('lists', [
      'setCurrentEntryId'
    ]),
  },
  computed: {
    ...mapGetters('lists', [
      'currentEntry',
    ])
  },
  created () {
    const id = this.$route.params.id
    this.setCurrentEntryId(id)
  },
}
</script>