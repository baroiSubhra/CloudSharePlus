<template>
  <div>
    <button class="relative flex" @click="triggerFileUpload">
      <input :id="id" class="invisible w-1 inline" type="file" @change.prevent="uploadFile" />
      <span>
        <img v-if="!uploadSuccessful" class="img-uploader" src="/logo.png" alt="" />
        <img v-else class="img-uploader" src="../assets/images/tick.png" alt="" />
      </span>
    </button>
    <span v-if="fileSizeExceeded" class="text-sm text-red-600"
      >File is larger than {{ MAX_FILE_SIZE }}MB, please choose another file</span
    >
    <div v-if="showUploadProgress">
      <div class="pb-1">
        <div class="flex justify-end text-sm">{{ percentage }}%</div>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          class="bg-gradient-to-l from-orange-500 to-yellow-500 h-2.5 rounded-full"
          :style="progress"
        ></div>
      </div>
      <div class="pt-2 text-center" v-if="submitted">
        <span v-if="uploadSuccessful" class="text-sm text-green-700"
          >File Uploaded Succesfully</span
        >
        <span v-else class="text-sm text-red-600"
          >There was an error in uploading file try again later</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { post } from '@/utils/httpClient'
export default {
  props: {
    modelValue: null,
    uploading: null,
    id: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      percentage: 0,
      progress: `width: 0%`,
      showUploadProgress: false,
      uploadSuccessful: false,
      submitted: false,
      progressInterval: null,
      fileSizeExceeded: false,
      MAX_FILE_SIZE: import.meta.env.VITE_FILE_SIZE
    }
  },
  computed: {
    fileData: {
      get() {
        return this.uploading
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    },
    fileUploadingBind: {
      get() {
        return this.uploading
      },
      set(val) {
        this.$emit('update:uploading', val)
      }
    }
  },
  methods: {
    triggerFileUpload() {
      document.getElementById(this.id).click()
    },
    isFileSizeValid(file) {
      let fileSizeLimit = this.MAX_FILE_SIZE * 1024 * 1024
      return file.size < fileSizeLimit
    },
    async uploadFile(event) {
      const file = event.target.files[0]
      if (!this.isFileSizeValid(file)) {
        this.fileSizeExceeded = true
        return
      }
      this.fileSizeExceeded = false
      this.showUploadProgress = true
      this.fileUploadingBind = true
      this.triggerProgress()
      const fileName = file.name
      let fileExtensionArray = file.name.split('.')
      const fileExtension = fileExtensionArray.pop()
      const fileNameWithoutExtn = fileExtensionArray.join('.')
      const blob = new Blob([file], {
        type: file.type
      })
      const endPoint = '/uploadFile/' + fileName
      const resp = await post(endPoint, blob)
      if (resp.success) {
        this.fileData = {
          fileName: fileNameWithoutExtn,
          fid: resp.data.$id,
          fileExtension
        }
        this.uploadSuccessful = true
        this.clearProgressInterval(true)
      } else {
        this.uploadSuccessful = false
        this.clearProgressInterval(false)
      }
      this.fileUploadingBind = false
      this.submitted = true
    },
    triggerProgress() {
      this.progressInterval = setInterval(() => {
        this.percentage += 10
      }, 3000)
    },
    clearProgressInterval(success) {
      clearInterval(this.progressInterval)
      if (success) {
        this.percentage = 100
      }
    }
  },
  watch: {
    percentage(newVal, oldVal) {
      this.progress = `width: ${newVal}%`
    }
  }
}
</script>

<style scoped>
.img-uploader {
  width: 200px;
}
</style>
