<template>
  <v-app>
    <v-toolbar fixed app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>ToDo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>person_add</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>add_circle</v-icon>
      </v-btn>
    </v-toolbar>
  <v-content>
    <nuxt/>
  </v-content>
  </v-app>
</template>

<script>
export default {
}
</script>
