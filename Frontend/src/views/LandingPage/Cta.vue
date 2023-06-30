<template>
  <section class="center" id="join">
    <div class="home">
      <div class="home-left">
        <img src="../../assets/images/view.png" alt="" />
      </div>
      <div class="home-right">
        <h1 class="mb-4">Start Your CloudSharePlus Journey Today!</h1>
        <h4 class="mb-4 color-secondary">
          Sign up for a free trial of CloudSharePlus today and experience the power of cloud sharing
          firsthand. Join thousands of satisfied users who have already embraced the simplicity and
          efficiency of our platform. Don't miss out on the opportunity to enhance your workflow and
          boost productivity.
        </h4>
        <div class="pt-4 cta">
          <router-link to="/login">
            <Button label="Login Or Signup" />
          </router-link>
        </div>
      </div>
    </div>
  </section>
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
@media screen and (max-width: 800px) {
  .home-left:nth-child(1) {
    grid-area: 2;
  }
}
</style>
