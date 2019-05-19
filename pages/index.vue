<template>
  <div>
    <v-list subheader two-line class="pa-0">
      <v-subheader>General</v-subheader>
      <template v-for="(item, index) in items">
        <div :key="item.title">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox v-model="item.isClose" ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content @click="">
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </div>
      </template>
    </v-list>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            title: 'ログイン機能の実装',
            subtitle: '',
            isClose: false
          },
          {
            title: '共有機能の作成',
            subtitle: '',
            isClose: false
          },
          {
            title: 'Firebaseとの連結',
            subtitle: '',
            isClose: false
          },
          {
            title: 'デザインのFIX',
            isClose: false
          },
          {
            title: 'アイテム追加機能の実装',
            isClose: false
          },
          {
            title: 'アイテム削除機能の実装',
            subtitle: '',
            isClose: false
          },
          {
            title: 'リスト追加機能の実装',
            subtitle: '',
            isClose: false
          },
          {
            title: 'リスト削除機能の実装',
            subtitle: '',
            isClose: false
          },
        ]
      }
    }
  }
</script>