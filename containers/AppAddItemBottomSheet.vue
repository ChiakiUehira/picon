<template>
  <v-bottom-sheet v-model="isOpen">
    <v-list>
      <v-subheader>Open in</v-subheader>
      <v-list-tile
        v-for="tile in tiles"
        :key="tile.title"
      >
        <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-bottom-sheet>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  watch: {
    isOpenAddItemBottomSheet () {
      if (this.isOpenAddItemBottomSheet) {
        this.isOpen = this.isOpenAddItemBottomSheet
      }
    },
    isOpen () {
      this.closeAddItemBottomSheet()
    }
  },
  methods: {
    ...mapActions('app', [
      'closeAddItemBottomSheet'
    ])
  },
  computed: {
    ...mapGetters('app', [
      'isOpenAddItemBottomSheet'
    ])
  },
  data () {
    return {
      isOpen: false,
      tiles: [
      ]
    }
  },
}
</script>