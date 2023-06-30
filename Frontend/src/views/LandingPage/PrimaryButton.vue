<template>
  <button>{{ label }}</button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
button {
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;

  padding: 1rem 2rem;
  background-image: linear-gradient(to left bottom, rgb(249, 115, 22), rgb(253, 224, 71));
  color: white;
  font-weight: 600;
  border-radius: 10px;
}
</style>
