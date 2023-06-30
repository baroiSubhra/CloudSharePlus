<template>
  <footer class="footer mt-16">
    <div class="footer__container grid">
      <div class="footer__content">
        <a href="#" class="footer__logo"> CloudSharePlus</a>
        <span class="footer__description">Best File Sharing Application</span>
        <div>
          <a class="footer__social">
            <i class="bx bxl-facebook"></i>
          </a>
          <a class="footer__social">
            <i class="bx bxl-instagram"></i>
          </a>
          <a class="footer__social">
            <i class="bx bxl-twitter"></i>
          </a>
        </div>
      </div>

      <div class="footer__content">
        <h3 class="footer__title">Features</h3>
        <ul>
          <li>
            <a class="footer__link"> Passwordless login </a>
          </li>
          <li>
            <a class="footer__link"> Simple</a>
          </li>
          <li>
            <a class="footer__link"> Global Sharing </a>
          </li>
          <li>
            <a class="footer__link"> Unlimited Storage </a>
          </li>
        </ul>
      </div>

      <div class="footer__content">
        <h3 class="footer__title">Company</h3>
        <ul>
          <li>
            <a href="#home" class="footer__link"> Home </a>
          </li>
          <li>
            <a href="#about" class="footer__link"> About Us </a>
          </li>
          <li>
            <a href="#join" class="footer__link"> Join Us </a>
          </li>
          <li>
            <router-link to="/terms-and-conditions" class="footer__link"
              >Terms of services</router-link
            >
          </li>
        </ul>
      </div>

      <div class="footer__content">
        <h3 class="footer__title">Contact Us</h3>
        <ul class="flex flex-col">
          <li class="footer__link block">Somwhere in India</li>
          <li class="footer__link block">Some pincode</li>
          <li class="footer__link block">999 - 888 - 777</li>
          <li class="footer__link block">cloudshareplus.com@gmail.com</li>
        </ul>
      </div>
    </div>

    <p class="text-align-center color-secondary mt-10 mb-4">
      &#169; 2023 CloudSharePlus. All right reserved
    </p>
  </footer>
</template>

<style scoped>
.grid {
  display: grid;
  gap: 1.5rem;
}
.footer__container {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  row-gap: 2rem;
}

.footer__logo {
  font-size: 1.5rem;
  color: transparent;
  background: linear-gradient(to left bottom, rgb(249, 115, 22), rgb(253, 224, 71));
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  font-weight: 700;
}
.footer__social {
  font-size: 1.5rem;
  color: black;
  margin-right: 1rem;
}
.footer__link {
  display: inline-block;
  color: var(--secondary-color);
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.footer__link:hover {
  color: transparent;
  background: linear-gradient(to left bottom, rgb(249, 115, 22), rgb(253, 224, 71));
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}

.footer__description {
  display: block;
  margin: 1rem 0 1rem;
}
</style>
