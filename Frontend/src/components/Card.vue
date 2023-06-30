<template>
  <div
    class="flex flex-col max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-dm-lite dark:border-gray-700"
  >
    <div class="p-4 flex justify-between items-center">
      <div>
        <svg
          v-if="!is_deleted"
          @click="patchIsDelete"
          class="w-5 text-gray-500 dark:text-gray-400"
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

        <svg
          v-else
          @click="patchIsDelete"
          class="w-5 text-gray-500 dark:text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z"
          ></path>
        </svg>
      </div>

      <svg
        @click="patchFavourite"
        class="w-5 text-gray-400"
        :class="[{ 'text-pink-600': is_fav }]"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z"
        ></path>
      </svg>
    </div>
    <div class="flex-1 flex justify-center items-center">
      <img
        class="rounded-t-lg"
        :src="image"
        style="height: 100px"
        alt="image of the portfolio template"
      />
    </div>
    <div class="p-5 flex-1 flex flex-col justify-between">
      <div>
        <a>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {{ file_name }}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ description }}
        </p>
      </div>

      <div class="pb-4" v-if="is_shared">
        <label for="password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >Sharable Link</label
        >
        <div class="flex">
          <div class="relative w-full">
            <input
              type="text"
              name="password"
              id="password"
              v-model="link"
              autocomplete="on"
              :disabled="true"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
            />
            <div
              @click="copyLink"
              class="absolute top-0 right-0 p-2.5 text-sm font-medium text-gray-500 bg-gray-50 rounded-r-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-dm-lite dark:hover:bg-dm-lite dark:focus:ring-white cursor-pointer"
            >
              <svg
                class="w-5 h-5 dark:text-white cursor-pointer"
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
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-between">
        <a
          @click="viewFile"
          class="inline-flex items-center px-3 py-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm dark:bg-dm-lite dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          View
          <svg
            fill="currentColor"
            class="w-4 h-4 ml-2 -mr-1"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
            ></path>
          </svg>
        </a>
        <a
          @click="patchShare"
          class="inline-flex justify-center items-center px-3 py-2.5 text-sm font-medium text-center text-white bg-gradient-to-b from-orange-500 to-yellow-500 rounded-lg hover:bg-gradient-to-b hover:from-orange-600 hover:to-yellow-600 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:focus:bg-white disabled:bg-gradient-to-b disabled:from-orange-300 disabled:to-yellow-300"
        >
          <template v-if="shareUpadteTriggered">
            <Spinner />
          </template>
          <template v-else>
            {{ is_shared ? 'Unshare' : 'Share' }}
            <svg
              v-if="!is_shared"
              fill="currentColor"
              class="w-5 h-5 ml-2 -mr-1"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path>
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>

            <svg
              v-else
              fill="currentColor"
              class="w-5 h-5 ml-2 -mr-1"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
              ></path>
              <path
                d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z"
              ></path>
            </svg>
          </template>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from './Spinner.vue'
export default {
  components: { Spinner },
  props: {
    index: {
      type: Number
    },
    id: {
      type: String
    },
    fid: {
      type: String
    },
    is_fav: {
      type: Boolean
    },
    is_deleted: {
      type: Boolean
    },
    is_shared: {
      type: Boolean
    },
    extension: {
      type: String
    },
    image: {
      type: String
    },
    file_name: {
      type: String
    },
    description: {
      type: String
    },
    leftButtonText: {
      type: String
    },
    rightButtonText: {
      type: String
    },
    centerButtonText: {
      type: String
    },
    leftButtonAction: {
      type: Function
    },
    rightButtonAction: {
      type: Function
    },
    centerButtonAction: {
      type: Function
    }
  },
  data() {
    return {
      shareUpadteTriggered: false
    }
  },
  computed: {
    link() {
      return window.origin + '/shared/' + this.fid
    }
  },
  methods: {
    patchFavourite() {
      this.$emit('patchFavourite', { id: this.id, index: this.index })
    },
    patchIsDelete() {
      this.$emit('patchIsDelete', { id: this.id, index: this.index })
    },
    patchShare() {
      this.shareUpadteTriggered = true
      this.$emit('patchShare', { id: this.id, index: this.index })
    },
    viewFile() {
      this.$emit('viewFile', {
        id: this.id,
        fid: this.fid,
        index: this.index,
        file_name: this.file_name,
        description: this.description,
        extension: this.extension
      })
    },
    copyLink() {
      navigator.clipboard.writeText(this.link)
    }
  },
  watch: {
    is_shared() {
      this.shareUpadteTriggered = false
    }
  }
}
</script>

<style scoped>
svg,
a {
  cursor: pointer;
}
</style>
