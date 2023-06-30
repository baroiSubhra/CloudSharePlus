<template>
  <Modal :id="id">
    <ViewDocument :data="data" />
  </Modal>
</template>

<script>
import Modal from './Modal.vue'
import ViewDocument from './ViewDocument.vue'
export default {
  components: {
    Modal,
    ViewDocument
  },
  props: {
    id: {
      type: String
    },
    data: {
      type: Object
    }
  }
}
</script>
