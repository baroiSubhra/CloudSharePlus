<template>
  <aside
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-dm-lite dark:border-gray-700"
    id="drawer-navigation"
  >
    <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-dm-lite">
      <ul class="space-y-2">
        <li @click="routeTo(routes.get(DOCUMENTS))">
          <a
            class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            :class="{
              'active-side-nav-link': this.$route.fullPath == routes.get(DOCUMENTS)
            }"
          >
            <svg
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              :class="{
                'text-gray-900 dark:text-white': this.$route.fullPath == routes.get(DOCUMENTS)
              }"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z"
              ></path>
              <path
                d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z"
              ></path>
            </svg>
            <span class="ml-3">Documents</span>
          </a>
        </li>
        <li @click="routeTo(routes.get(RECENTS))">
          <button
            type="button"
            class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            :class="{
              'active-side-nav-link': this.$route.fullPath == routes.get(RECENTS)
            }"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
              :class="{
                'text-gray-900 dark:text-white': this.$route.fullPath == routes.get(RECENTS)
              }"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
              ></path>
            </svg>
            <span class="flex-1 ml-3 text-left whitespace-nowrap">Recents</span>
          </button>
        </li>
        <li @click="routeTo(routes.get(FAVOURITES))">
          <a
            class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            :class="{
              'active-side-nav-link': this.$route.fullPath == routes.get(FAVOURITES)
            }"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
              :class="{
                'text-gray-900 dark:text-white': this.$route.fullPath == routes.get(FAVOURITES)
              }"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z"
              ></path>
            </svg>

            <span class="flex-1 ml-3 text-left whitespace-nowrap">Favourites</span>
          </a>
        </li>
        <li @click="routeTo(routes.get(TRASH))">
          <button
            type="button"
            class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            :class="{
              'active-side-nav-link': this.$route.fullPath == routes.get(TRASH)
            }"
          >
            <svg
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
              :class="{
                'text-gray-900 dark:text-white': this.$route.fullPath == routes.get(TRASH)
              }"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
              ></path>
            </svg>
            <span class="flex-1 ml-3 text-left whitespace-nowrap">Trash</span>
          </button>
        </li>
      </ul>
      <ul class="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
        <li @click="logoutUser">
          <a
            class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
          >
            <svg
              fill="currentColor"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M10 2a.75.75 0 01.75.75v7.5a.75.75 0 01-1.5 0v-7.5A.75.75 0 0110 2zM5.404 4.343a.75.75 0 010 1.06 6.5 6.5 0 109.192 0 .75.75 0 111.06-1.06 8 8 0 11-11.313 0 .75.75 0 011.06 0z"
              ></path>
            </svg>
            <span class="ml-3">Logout</span>
          </a>
        </li>
      </ul>
    </div>
    <div
      class="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-dm-lite z-20"
    ></div>
  </aside>
</template>

<script>
import { session } from '@/utils/passage'
import { DOCUMENTS, RECENTS, FAVOURITES, TRASH, ROUTE_MAP } from '../utils/constants'
export default {
  data() {
    return {
      routes: ROUTE_MAP,
      DOCUMENTS: DOCUMENTS,
      RECENTS: RECENTS,
      FAVOURITES: FAVOURITES,
      TRASH: TRASH
    }
  },
  methods: {
    routeTo(route) {
      this.$router.push(route)
    },
    async logoutUser() {
      const result = await session.signOut()
      if (result) {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
.active-side-nav-link {
  @apply bg-gray-100 dark:bg-gray-700;
}

a:hover {
  cursor: pointer;
}
</style>
