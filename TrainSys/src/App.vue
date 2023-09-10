<template>
  <Header v-if="renderMenu" />

  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import {RouterLink} from "vue-router"
import Header from "./components/Header.vue"

export default {
  components: {
    RouterLink,
    Header
  },

  computed: {
    renderMenu() {
      return this.$route.path !== '/' && this.$route.path !== '/cadastro/usuario'
    }
  }
}
</script>