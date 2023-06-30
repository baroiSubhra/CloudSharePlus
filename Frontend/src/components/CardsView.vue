<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-4 mt-4">
    <template v-for="(item, index) in data" :key="index">
      <Card
        :index="index"
        :id="item.id"
        :is_fav="item.is_fav"
        :is_deleted="item.is_deleted"
        :is_shared="item.is_shared"
        :fid="item.fid"
        :extension="item.extension"
        :image="item.img"
        :file_name="item.file_name"
        :description="item.description"
        leftButtonText="View"
        rightButtonText="Delete"
        @patchFavourite="patchFavourite"
        @patchIsDelete="patchIsDelete"
        @patchShare="patchShare"
        @viewFile="viewFile"
      />
    </template>
  </div>
  <ViewDocumentModal :id="modalId" :data="selectedDocument" />
</template>

<script>
import { openModal, closeModal } from '@/utils/modalFunctions'
import { patch, del } from '@/utils/httpClient'
import Card from './Card.vue'
import ViewDocumentModal from './ViewDocumentModal.vue'
import { FAVOURITES } from '@/utils/constants'
export default {
  components: {
    Card,
    ViewDocumentModal
  },
  props: { modelValue: null },
  data() {
    return {
      selectedDocument: {},
      modalId: 'docViewer'
    }
  },
  computed: {
    data: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    }
  },
  methods: {
    async patchFavourite(doc) {
      const identifierIndex = doc.index
      const currentStatus = this.data[identifierIndex].is_fav
      const params = { fav: !currentStatus }
      const url = '/favorite/' + doc.id
      const entry = this.data[identifierIndex]
      this.data[identifierIndex].is_fav = !currentStatus
      if (this.$route.name == FAVOURITES) {
        this.data.splice(identifierIndex, 1)
      }
      let resp = await patch(url, params)
      if (!resp.success) {
        this.data[identifierIndex].is_fav = entry.is_fav
        this.data.push(entry)
      }
    },
    async patchIsDelete(doc) {
      const identifierIndex = doc.index
      const currentStatus = this.data[identifierIndex].is_deleted
      const params = { del: !currentStatus }
      const url = '/delete/' + doc.id
      const entry = this.data[identifierIndex]
      this.data.splice(identifierIndex, 1)
      let resp = await patch(url, params)
      if (!resp.success) {
        this.data.push(entry)
      }
    },
    async patchShare(doc) {
      const identifierIndex = doc.index
      const currentStatus = this.data[identifierIndex].is_shared
      const params = { is_shared: !currentStatus }
      const url = '/share/' + doc.id
      let resp = await patch(url, params)
      if (resp.success) {
        this.data[identifierIndex].is_shared = !currentStatus
      } else {
      }
    },
    viewFile(doc) {
      this.selectedDocument = doc
      this.openUploadModal()
    },
    openUploadModal() {
      openModal(this.modalId)
    }
  }
}
</script>
