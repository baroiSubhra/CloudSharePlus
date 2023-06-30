<template>
  <div class="py-6 leading-tight tracking-tight text-gray-800 text-xl font-medium dark:text-white">
    <div class="text-2xl font-semibold text-gray-900 dark:text-white text-center pb-4">
      Upload File
    </div>
    <div class="flex justify-center items-center pb-4">
      <FileUploader v-model="fileDetails" v-model:uploading="fileUploading" id="uploader" />
    </div>
    <div class="pt-4">
      <label for="fileName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >File Name</label
      >
      <input
        type="text"
        name="fileName"
        id="fileName"
        v-model="fileName"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
        placeholder="Enter file name"
      />
    </div>
    <div class="pt-4">
      <label for="desc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        File description</label
      >
      <textarea
        name="desc"
        id="desc"
        v-model="fileDescription"
        rows="4"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
        placeholder="Enter description"
      ></textarea>
    </div>
    <div class="flex justify-center pt-4">
      <button
        @click="completeUpload"
        :disabled="!enableButton"
        class="inline-flex justify-center items-center px-3 py-2.5 text-sm font-medium text-center text-white bg-gradient-to-b from-orange-500 to-yellow-500 rounded-lg hover:bg-gradient-to-b hover:from-orange-600 hover:to-yellow-600 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:focus:bg-white disabled:bg-gradient-to-b disabled:from-orange-300 disabled:to-yellow-300"
      >
        <span>Upload File</span>
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
            d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { get, post } from '@/utils/httpClient'
import FileUploader from './FileUpload.vue'
import Modal from './Modal.vue'

export default {
  props: {
    id: {
      type: String
    },
    keyn: {
      type: Boolean
    }
  },
  data() {
    return {
      fileDetails: '',
      fileName: '',
      fileDescription: '',
      fileUploading: false,
      sceneKey: false
    }
  },
  computed: {
    enableButton() {
      return this.fileDetails != '' && this.fileName != '' && this.fileUploading == false
    }
  },
  components: {
    Modal,
    FileUploader
  },
  methods: {
    async completeUpload() {
      const endPoint = '/completFileUpload'
      const payload = {
        fid: this.fileDetails.fid,
        file_name: this.fileName,
        description: this.fileDescription,
        extension: this.fileDetails.fileExtension
      }
      const resp = await post(endPoint, payload)
      if (resp.success) {
        this.$emit('refetchData')
      }
    }
  },
  watch: {
    fileDetails(newVal, oldVal) {
      if (this.fileName == '') {
        this.fileName = newVal.fileName
      }
    }
  }
}
</script>
