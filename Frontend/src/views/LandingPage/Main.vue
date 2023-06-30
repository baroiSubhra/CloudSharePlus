<template>
  <main>
    <div class="home mt-16" id="home">
      <div class="home-left">
        <h1 class="mb-4">
          <span class="bg-clip-text text-transparent bg-gradient-to-b from-orange-500 to-yellow-500"
            >CloudSharePlus</span
          ><br />
          Seamless File Sharing
        </h1>
        <h4 class="mb-4 color-secondary">
          Welcome to CloudSharePlus, the ultimate online file sharing platform designed to simplify
          collaboration and boost productivity. With our secure and user-friendly interface, you can
          effortlessly store, organize, and share your files from anywhere, anytime. Experience
          seamless collaboration like never before with CloudSharePlus.
        </h4>
        <div class="pt-4 cta">
          <router-link to="/login">
            <Button label="Login Or Signup" />
          </router-link>
        </div>
      </div>
      <div class="home-right center">
        <img class="img-wdth" src="../../assets/images/home.png" alt="" />
      </div>
    </div>
  </main>
</template>

<script>
import Button from './PrimaryButton.vue'
export default {
  components: {
    Button
  }
}
</script>

<style scoped>
.img-wdth {
  width: 80%;
}
</style>
