<template>
  <Modal :id="id">
    <UploadContentVue :key="remountKey" @refetchData="refetchData" />
  </Modal>
</template>

<script>
import Modal from './Modal.vue'
import UploadContentVue from './UploadContent.vue'
import { closeModal } from '@/utils/modalFunctions'

export default {
  components: {
    UploadContentVue,
    Modal
  },
  props: {
    id: {
      type: String
    },
    remountKey: {
      type: Boolean
    }
  },
  methods: {
    refetchData() {
      closeModal(this.id)
      this.$emit('refetchData')
    }
  }
}
</script>
