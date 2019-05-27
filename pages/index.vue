<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
     ...mapGetters('app', [
      'username',
    ]),
  },
  created() {
    this.$router.push(`/${username}`)
  },
}
</script>
