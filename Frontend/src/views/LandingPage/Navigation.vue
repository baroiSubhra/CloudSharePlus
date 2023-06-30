<template>
  <header class="header" :class="{ 'scroll-header': addBoxShadow }" id="header">
    <nav class="nav container" :class="{ 'dark-theme': addDarkTheme }">
      <a href="#" class="nav__logo">
        <div class="flex justify-center items-center">
          <div>
            <img src="/logo.png" class="mr-3 h-8 rounded" alt="CloudSharePlus Logo" />
          </div>
          <div>CloudSharePlus</div>
        </div>
      </a>
      <div class="nav__menu" :class="{ 'show-menu': openMenu }" id="nav-menu">
        <ul class="nav__list">
          <li class="nav__item">
            <a href="/#home" class="nav__link active-link"> Home </a>
          </li>
          <li class="nav__item">
            <a href="/#about" class="nav__link">About </a>
          </li>
          <li class="nav__item">
            <a href="/#features" class="nav__link"> Features </a>
          </li>
          <li class="nav__item">
            <a href="/#join" class="nav__link"> Join </a>
          </li>
          <li class="nav__item">
            <div class="center">
              <ThemeSelector />
            </div>
          </li>
        </ul>
      </div>

      <div class="nav__toggle" id="nav-toggle" @click="toggleMobileMenu">
        <svg
          class="w-5 ml-1 dark:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm7 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </div>
    </nav>
  </header>
</template>

<script>
import ThemeSelector from '../../components/ThemeSelector.vue'

export default {
  components: {
    ThemeSelector
  },
  data() {
    return {
      openMenu: false,
      addBoxShadow: false,
      addDarkTheme: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.openMenu = !this.openMenu
    },
    checkAndAddBoxShadow() {
      if (window.scrollY >= 200) {
        this.addBoxShadow = true
      } else {
        this.addBoxShadow = false
      }
    },
    toggleDarkMode() {
      this.addDarkTheme = !this.addDarkTheme
    }
  },
  created() {
    window.addEventListener('scroll', this.checkAndAddBoxShadow)
  }
}
</script>

<style scoped>
.nav-container {
  width: 100%;
}

.nav {
  max-width: 1024px;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .nav__menu {
    position: fixed;
    top: -100%;
    left: 0;
    width: 100%;
    padding: 1.5rem 0 1rem;
    text-align: center;
    background-color: var(--nav-bg-color);
    transition: 0.4s;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 1rem 1rem;
    z-index: 100;
  }
}

.nav__item {
  margin-bottom: 1rem;
}
.nav__link,
.nav__logo,
.nav__toggle {
  color: var(--text-black);
  font-weight: 600;
}
.nav__logo:hover {
  color: transparent;
  background: linear-gradient(to left bottom, rgb(249, 115, 22), rgb(253, 224, 71));
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
.nav__link {
  transition: 0.3s;
}
.nav__link:hover {
  color: transparent;
  background: linear-gradient(to left bottom, rgb(249, 115, 22), rgb(253, 224, 71));
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
.nav__toggle {
  font-size: 1.3rem;
  cursor: pointer;
}

/* Show menu */
.show-menu {
  top: 3rem;
}
/* Active menu */
.active-link {
  color: transparent;
  background: linear-gradient(to left bottom, rgb(249, 115, 22), rgb(253, 224, 71));
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
/* Change background header */
.scroll-header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
/* Scroll top */
.scrolltop {
  position: fixed;
  right: 1rem;
  bottom: -20%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem;
  background: rgba(6, 156, 84, 0.5);
  border-radius: 0.4rem;
  z-index: var(--z-tooltip);
  transition: 0.4s;
  visibility: hidden;
}
.scrolltop:hover {
  background-color: var(--first-color-alt);
}
.scrolltop__icon {
  font-size: 1.8rem;
  color: var(--body-color);
}
.show-scroll {
  visibility: visible;
  bottom: 1.5rem;
}

@media screen and (min-width: 768px) {
  .nav {
    height: calc(3rem + 1.5rem);
  }
  .nav__list {
    display: flex;
  }
  .nav__item {
    margin-left: 2.5rem;
    margin-bottom: 0;
  }
  .nav__toggle {
    display: none;
  }
  .change-theme {
    position: initial;
    margin-left: 1rem;
  }
}
</style>
