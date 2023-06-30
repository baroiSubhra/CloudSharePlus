<template>
  <nav
    class="bg-white border-b border-gray-200 px-1 md:px-4 py-2.5 dark:bg-dm-lite dark:border-gray-700 fixed left-0 right-0 top-0 z-50"
  >
    <div class="flex flex-wrap justify-between items-center">
      <div class="flex justify-start items-center">
        <button
          @click="toggleSideBar"
          class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            fill="currentColor"
            class="w-6 h-6"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
          <span class="sr-only">Toggle sidebar</span>
        </button>
        <a href="/" class="flex items-center justify-between mr-4">
          <img src="/logo.png" class="mr-3 h-8 rounded" alt="CloudSharePlus Logo" />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
            >CloudSharePlus</span
          >
        </a>
      </div>
      <div class="flex items-center lg:order-2">
        <div class="mr-4">
          <ThemeSelector />
        </div>
        <button
          type="button"
          class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          id="user-menu-button"
        >
          <img
            class="w-8 h-8 rounded-full border-none bg-white"
            :src="imageLink"
            alt="user photo"
          />
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import defaultImage from '@/assets/images/avatar.jpg'
import ThemeSelector from './ThemeSelector.vue'
// import { getAvatar } from '@/apis/api'
export default {
  components: {
    ThemeSelector
  },
  data() {
    return {
      imageLink: defaultImage
    }
  },
  methods: {
    async getImage() {
      // const resp = await getAvatar()
      // if (resp.success) {
      //   this.imageLink = resp.data.href
      //   this.$store.dispatch('auth/saveAvatar', this.imageLink)
      // }
    },
    toggleSideBar() {
      const element = document.getElementById('drawer-navigation')
      const backdrop = document.getElementById('backdrop')
      document.body.classList.toggle('overflow-hidden')
      backdrop.classList.toggle('hidden')
      if (element.classList.contains('transform-none')) {
        element.ariaModal = false
        element.role = ''
        element.classList.remove('transform-none')
      } else {
        element.classList.add('transform-none')
        element.ariaModal = true
        element.role = 'dialog'
      }
    }
  },
  mounted() {
    this.getImage()
  }
}
</script>
