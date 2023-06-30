<template>
  <Nav />
  <div class="container vh100">
    <Main />
    <About />
    <Features />
    <Cta />
    <Footer />
  </div>
</template>

<script>
import '@/assets/landing-style.css'
import Nav from './Navigation.vue'
import Main from './Main.vue'
import About from './About.vue'
import Features from './Features.vue'
import Cta from './Cta.vue'
import Footer from './Footer.vue'
export default {
  components: {
    Nav,
    Main,
    About,
    Features,
    Cta,
    Footer
  }
}
</script>
