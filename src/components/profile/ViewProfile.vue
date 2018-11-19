import { cacheBusting } from '../../../build/vue-loader.conf';
<template>
  <div class="view-profile container">
    <div v-if="profile" class="card">
      <h2 class="deep-purple-text center">{{ profile.alias }} dados</h2>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
  export default {
    name: 'ViewProfile',
    data() {
      return {
        profile: null
      }
    },
    async created () {
      this.profile = (await db.collection('users').doc(this.$route.params.id).get()).data()
    }
  }
</script>
