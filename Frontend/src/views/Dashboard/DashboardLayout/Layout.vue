<template>
  <section class="p-4 md:ml-64 h-auto pt-20 min-h-screen">
    <div class="flex justify-between items-center">
      <div class="text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
        {{ pageTitle }}
      </div>
      <div v-if="showUploadButton">
        <a
          @click="openUploadModal"
          class="inline-flex cursor-pointer justify-center items-center px-3 py-2.5 text-sm font-medium text-center text-white bg-gradient-to-b from-orange-500 to-yellow-500 rounded-lg hover:bg-gradient-to-b hover:from-orange-600 hover:to-yellow-600 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:focus:bg-white disabled:bg-gradient-to-b disabled:from-orange-300 disabled:to-yellow-300"
        >
          Upload
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
              d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm4.75 11.25a.75.75 0 001.5 0v-2.546l.943 1.048a.75.75 0 101.114-1.004l-2.25-2.5a.75.75 0 00-1.114 0l-2.25 2.5a.75.75 0 101.114 1.004l.943-1.048v2.546z"
            ></path>
          </svg>
        </a>
      </div>
    </div>
    <div class="py-20" v-if="loadingData">
      <Spinner />
    </div>
    <div v-else>
      <template v-if="data.length > 0">
        <CardsView v-model="data" />
      </template>
      <template v-else>
        <Nodata />
      </template>
    </div>
  </section>
  <UploadFileModal :id="modalId" :remountKey="modalRemountKey" @refetchData="fetchDocuments" />
</template>

<script>
import { get } from '@/utils/httpClient'
import CardsView from '@/components/CardsView.vue'
import FileUpload from '@/components/FileUpload.vue'
import Nodata from '../../../components/Nodata.vue'
import Modal from '../../../components/Modal.vue'
import Spinner from '../../../components/Spinner.vue'
import UploadFileModal from '../../../components/UploadFileModal.vue'
import { openModal, closeModal } from '@/utils/modalFunctions'
import { DOCUMENTS, RECENTS, FAVOURITES, TRASH, PAGE_TITLE_MAPPING } from '@/utils/constants'
import documetImage from '../../../assets/images/document.png'

export default {
  components: {
    CardsView,
    FileUpload,
    Spinner,
    Modal,
    UploadFileModal,
    Nodata
  },
  data() {
    return {
      data: [],
      pageTitle: '',
      showUploadButton: true,
      loadingData: false,
      modalId: 'upl',
      pageName: this.$route.name,
      modalRemountKey: false
    }
  },
  methods: {
    initialize() {
      this.initializePage()
      this.fetchDocuments()
    },
    initializePage() {
      this.pageTitle = PAGE_TITLE_MAPPING.get(this.pageName)
      this.showUploadButton = this.pageName !== TRASH
    },
    async fetchDocuments() {
      this.loadingData = true
      let params = this.getParameters()
      let resp = await get('/getDocuments', params)
      if (resp.success) {
        this.data = resp.data.documents.map((el) => {
          return {
            id: el.$id,
            is_fav: el.fav,
            is_deleted: el.is_deleted,
            is_shared: el.is_shared,
            fid: el.fid,
            extension: el.extension,
            img: documetImage,
            file_name: el.file_name,
            description: el.description
          }
        })
      }
      this.loadingData = false
    },
    getParameters() {
      let params = {}
      switch (this.pageName) {
        case RECENTS: {
          params = {
            order: 'desc'
          }
          break
        }
        case FAVOURITES: {
          params = {
            favourite: true
          }
          break
        }
        case TRASH: {
          params = {
            trash: true
          }
          break
        }
        default: {
        }
      }
      return params
    },
    updateModalRemountKeyKey() {
      this.modalRemountKey = !this.modalRemountKey
    },
    openUploadModal() {
      openModal(this.modalId)
      this.updateModalRemountKeyKey()
    }
  },
  mounted() {
    this.initialize()
  }
}
</script>
