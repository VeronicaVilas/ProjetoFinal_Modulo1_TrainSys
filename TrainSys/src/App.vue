<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import {RouterLink} from "vue-router"

export default {
  components: {
    RouterLink,
  },
}
</script>