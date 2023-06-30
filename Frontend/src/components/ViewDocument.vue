<template>
  <div
    class="py-6 leading-tight tracking-tight text-gray-800 text-xl font-medium dark:text-white text-center"
  >
    <div class="flex justify-center items-center pb-4">
      <div v-if="!fileReady">
        <Spinner />
      </div>
      <div v-else>
        <div v-if="IMAGE_FORMAT.includes(data.extension)">
          <img :class="{ 'image-wraper': sharedFilePath }" :src="imageUrl" alt="" />
        </div>
        <div v-else><img class="doc-image-style" src="../assets/images/document.png" alt="" /></div>
      </div>
    </div>
    <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {{ data.file_name }}
    </h2>
    <h4 class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ data.description }}</h4>
    <button
      @click="downloadFile"
      :disabled="!fileReady"
      class="inline-flex justify-center items-center px-3 py-2.5 text-sm font-medium text-center text-white bg-gradient-to-b from-orange-500 to-yellow-500 rounded-lg hover:bg-gradient-to-b hover:from-orange-600 hover:to-yellow-600 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:focus:bg-white disabled:bg-gradient-to-b disabled:from-orange-300 disabled:to-yellow-300"
    >
      <span>Download File</span>
      <svg
        class="w-4 h-4 ml-2 -mr-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm5.25-9.25a.75.75 0 00-1.5 0v4.59l-1.95-2.1a.75.75 0 10-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V7.75z"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script>
import { getFile } from '@/utils/httpClient'
import Modal from './Modal.vue'
import Spinner from './Spinner.vue'
import { IMAGE_FORMAT } from '@/utils/constants'
export default {
  components: {
    Modal,
    Spinner
  },
  props: {
    data: {
      type: Object
    },
    sharedFilePath: {
      type: Boolean
    }
  },
  data() {
    return {
      imageUrl: '',
      fileReady: false,
      IMAGE_FORMAT: IMAGE_FORMAT
    }
  },
  methods: {
    async generateUrl() {
      const apiEndpoint = '/getFile/' + this.data.fid
      let resp = await getFile(apiEndpoint)
      if (resp.success) {
        const blob = new Blob([resp.data], { type: 'application/' + this.data.extension })
        const url = window.URL.createObjectURL(blob)
        this.imageUrl = url
      }
    },
    async downloadFile() {
      const link = document.createElement('a')
      link.href = this.imageUrl
      link.setAttribute('download', this.data.file_name + '.' + this.data.extension)
      document.body.appendChild(link)
      link.click()
    },
    async loadData() {
      this.fileReady = false
      await this.generateUrl()
      this.fileReady = true
    },
    initialize() {
      if (this.data.fid) {
        this.loadData()
      }
    }
  },
  watch: {
    data: function (new_value, old_value) {
      this.loadData()
    }
  },
  mounted() {
    this.initialize()
  }
}
</script>

<style scoped>
.doc-image-style {
  width: 300px;
}

.image-wraper {
  max-height: 50vh;
  max-width: 50vw;
}
</style>
