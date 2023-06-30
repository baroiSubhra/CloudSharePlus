<template>
  <RouterView />
</template>

<script>
import { COLOR_THEME_SELECTOR_KEY } from '@/utils/constants'
import { RouterView } from 'vue-router'
export default {
  methods: {
    intialize() {
      if (localStorage.getItem(COLOR_THEME_SELECTOR_KEY) == 'dark') {
        document.documentElement.classList.add('dark')
        this.isDarkMode = true
      } else {
        document.documentElement.classList.remove('dark')
        this.isDarkMode = false
      }
    }
  },
  mounted() {
    this.intialize()
  }
}
</script>
