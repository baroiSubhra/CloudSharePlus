<template>
  <section class="bg-gray-50 dark:bg-dm min-h-screen">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div :class="{ 'pb-5': !showNoData }">
        <a class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-20 mr-2 rounded" src="/logo.png" alt="logo" />
          CloudSharePlus
        </a>
      </div>
      <template v-if="loadingFileDetails">
        <Spinner />
      </template>
      <template v-else>
        <template v-if="showNoData">
          <div>
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Oops!! No data found
            </h1>
            <h1 class="text-md font-semibold text-gray-600 dark:text-white text-center">
              Sorry it seems like the data you are looking for is not shared, or deleted.<br />
              Please contact the administer or owner of the file to get the correct link with
              permissions
            </h1>
          </div>
        </template>
        <template v-else>
          <div class="image-wraper">
            <ViewDocument :data="data" :sharedFilePath="true" />
          </div>
        </template>
      </template>
    </div>
  </section>
</template>

<script>
import { get } from '@/utils/httpClient'
import ViewDocument from '@/components/ViewDocument.vue'
import Spinner from '@/components/Spinner.vue'
export default {
  components: {
    ViewDocument,
    Spinner
  },
  data() {
    return {
      fid: this.$route.params.id,
      data: {},
      loadingFileDetails: false,
      showNoData: false
    }
  },
  methods: {
    initialize() {
      this.getFileDetails()
    },
    async getFileDetails() {
      this.loadingFileDetails = true
      const endpoint = '/getFileDetails/' + this.fid
      let resp = await get(endpoint)
      if (resp.success && resp.data.total > 0) {
        this.data = resp.data.documents
          .map((el) => {
            return {
              fid: this.fid,
              extension: el.extension,
              description: el.description,
              file_name: el.file_name
            }
          })
          .pop()
      } else {
        this.showNoData = true
      }
      this.loadingFileDetails = false
    }
  },
  mounted() {
    this.initialize()
  }
}
</script>
