<template>
  <section class="bg-gray-50 dark:bg-dm min-h-screen">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2 rounded" src="/logo.png" alt="logo" />
        CloudSharePlus
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-dm-lite dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center"
          >
            Login Or Signup Into Your Account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="login">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >
              <input
                type="email"
                name="email"
                id="email"
                v-model="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
                placeholder="name@company.com"
              />
            </div>
            <p class="text-md text-gray-800 dark:text-white capitalize text-center" v-if="mlCode">
              We are validating, will log you in soon!
            </p>
            <p
              class="text-sm text-green-600 dark:text-green-500 capitalize text-center"
              v-if="showSuccessText"
            >
              {{ successfulText }}
            </p>
            <p
              class="text-sm text-red-600 dark:text-red-500 capitalize text-center"
              v-if="showError"
            >
              {{ errorText }} , Try Login Or Signup in Sometime
            </p>
            <button
              type="submit"
              :disabled="disableSubmitButton"
              class="inline-flex w-full justify-center items-center px-5 py-3 text-sm font-medium text-center text-white bg-gradient-to-b from-orange-500 to-yellow-500 rounded-lg hover:bg-gradient-to-b hover:from-orange-600 hover:to-yellow-600 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:focus:bg-white disabled:bg-gradient-to-b disabled:from-orange-300 disabled:to-yellow-300"
            >
              <div v-if="!disableSubmitButton">Login Or Signup</div>
              <div v-else>
                <Spinner />
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { passage } from '@/utils/passage'
import Spinner from '@/components/Spinner.vue'
import { EMAIL_LOCALSTORAGE_KEY } from '../../utils/constants'

export default {
  components: { Spinner },
  data() {
    return {
      email: '',
      mlCode: this.$route.query.psg_magic_link,
      loginTriggered: false,
      validatingMagicLnk: false,
      errorText: '',
      showError: false,
      successfulText: '',
      showSuccessText: false
    }
  },
  computed: {
    disableSubmitButton() {
      return this.mlCode && this.mlCode.length > 0 ? this.validatingMagicLnk : this.loginTriggered
    }
  },
  methods: {
    async login() {
      this.loginTriggered = true
      const app = await passage.appInfo()
      const webAuthConfig = passage.checkWebauthnConfig(app)
      const isWebauthnSupported = await passage.isWebauthnSupported()
      const userInfo = await passage.identifierExists(this.email)
      let response
      if (userInfo === null) {
        //register
        if (webAuthConfig && isWebauthnSupported) {
          response = await this.getResponseInDesiredFormat(() => {
            passage.register(this.email)
          })
        } else {
          response = await this.getResponseInDesiredFormat(() => {
            passage.newRegisterMagicLink(this.email)
          })
        }
      } else {
        //login
        if (webAuthConfig && isWebauthnSupported) {
          response = await this.getResponseInDesiredFormat(() => {
            passage.login(this.email)
          })
        } else {
          response = await this.getResponseInDesiredFormat(() => {
            passage.newLoginMagicLink(this.email)
          })
        }
      }
      if (response.success) {
        this.showSuccessText = true
        if (webAuthConfig && isWebauthnSupported) {
          this.successfulText = 'Complete the login using biometrics'
        } else {
          this.successfulText = "We've sent you a maigc link ,please check your email"
        }
        this.saveEmail()
      } else {
        this.showError = true
        this.errorText = response.data.message
        this.$router.replace({ query: null })
      }
      this.loginTriggered = false
    },
    async authenticateMagicLink() {
      this.validatingMagicLnk = true
      const app = await passage.appInfo()
      const webAuthConfig = passage.checkWebauthnConfig(app)
      const isWebauthnSupported = await passage.isWebauthnSupported()
      let response
      if (webAuthConfig && isWebauthnSupported) {
        response = await this.getResponseInDesiredFormat(() =>
          passage.magicLinkActivateWebAuthnNewDevice(this.mlCode)
        )
      } else {
        response = await this.getResponseInDesiredFormat(() =>
          passage.magicLinkActivate(this.mlCode)
        )
      }
      if (response.success) {
        this.showSuccessText = true
        this.successfulText = 'Validation Complete'
        this.$router.push('/login')
      } else {
        this.showError = true
        this.errorText = response.data.message
        this.$router.replace({ query: null })
      }
      this.validatingMagicLnk = false
    },
    async getResponseInDesiredFormat(fn) {
      let response
      try {
        response = await fn()
        response = {
          data: response,
          success: true
        }
      } catch (error) {
        response = {
          data: error,
          success: false
        }
      }
      return response
    },
    saveEmail() {
      localStorage.setItem(EMAIL_LOCALSTORAGE_KEY, this.email)
    },
    getEmailAndPopulateInput() {
      const email = localStorage.getItem(EMAIL_LOCALSTORAGE_KEY)
      if (email) {
        this.email = email
      }
    }
  },
  mounted() {
    if (this.mlCode) {
      this.authenticateMagicLink()
    }
    this.getEmailAndPopulateInput()
  }
}
</script>
