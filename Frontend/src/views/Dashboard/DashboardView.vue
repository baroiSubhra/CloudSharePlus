<template>
  <div class="flex w-full h-full justify-center items-center min-h-screen" v-if="loadingConfig">
    <SpinnerVue />
  </div>
  <div class="antialiased bg-gray-50 dark:bg-dm" v-else>
    <Nav />
    <Sidenav />
    <RouterView :key="$route.path" />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import Sidenav from '@/components/Sidenav.vue'
import { RouterView } from 'vue-router'
import SpinnerVue from '@/components/Spinner.vue'
export default {
  components: {
    Sidenav,
    Nav,
    SpinnerVue
  },
  data() {
    return {
      loadingConfig: true
    }
  },
  methods: {
    initailize() {
      this.loadingConfig = false
    }
  },
  mounted() {
    this.initailize()
  }
}
</script>
