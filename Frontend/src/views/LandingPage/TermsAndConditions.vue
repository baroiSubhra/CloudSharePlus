<template>
  <Nav />
  <div class="container">
    <div>
      <div class="tandc mt-16" id="home">
        <div>
          <h1 class="mb-4 text-center">Terms And Conditions</h1>
          <h4 class="mb-6 text-center">
            These Terms and Conditions ("Agreement") govern your use of the CloudSharePlus website
            ("CloudSharePlus" or the "Website") and any related services provided by CloudSharePlus. By
            accessing or using the Website, you agree to be bound by this Agreement. If you do not
            agree with any of these terms, please refrain from using the Website.
          </h4>
          <h4 class="mb-4 color-secondary">
            <ul class="list-disc pl-4">
              <li class="mb-3">
                Acceptance: By accessing or using the CloudSharePlus Website, you affirm that you are at
                least 13 years old and capable of entering into a legally binding agreement. If you
                are accessing or using the Website on behalf of a company, organization, or other
                entity, you represent that you have the authority to bind such entity to this
                Agreement.
              </li>
              <li class="mb-3">
                Modifications: CloudSharePlus reserves the right to modify, suspend, or discontinue any
                part of the Website or its services at any time without prior notice. We may also
                update or modify this Agreement from time to time, and any changes will be effective
                immediately upon posting on the Website. It is your responsibility to review this
                Agreement periodically for any updates or modifications.
              </li>
              <li class="mb-3">
                Account Creation: In order to access certain features and services of the CloudSharePlus
                Website, you must create an account. You agree to provide accurate, current, and
                complete information during the registration process and to update such information
                as necessary to keep it accurate, current, and complete.
              </li>
              <li class="mb-3">
                Account Security: You are solely responsible for maintaining the confidentiality of
                your account credentials and for any activities or actions that occur under your
                account. You agree to notify CloudSharePlus immediately of any unauthorized use of your
                account or any other breach of security.
              </li>
              <li class="mb-3">
                Ownership: CloudSharePlus retains all right, title, and interest in and to the Website
                and its services, including all intellectual property rights associated with them.
                You may not copy, modify, distribute, sell, or lease any part of the Website or its
                services without the express written consent of CloudSharePlus.
              </li>
              <li class="mb-3">
                Disclaimer of Warranties: The CloudSharePlus Website and its services are provided on an
                "as-is" and "as available" basis. CloudSharePlus does not warrant that the Website will
                be error-free, uninterrupted, or free from viruses or other harmful components. Your
                use of the Website is at your own risk.
              </li>
              <li class="mb-3">
                Limitation of Liability: In no event shall CloudSharePlus or its officers, directors,
                employees, or agents be liable to you or any third party for any indirect,
                incidental, special, consequential, or punitive damages arising out of or in
                connection with your use of the CloudSharePlus Website or its services.
              </li>
              <li class="mb-3">
                Termination by User: You may terminate this Agreement by discontinuing your use of
                the CloudSharePlus Website.
              </li>
              <li class="mb-3">
                Termination by CloudSharePlus: CloudSharePlus reserves the right, in its sole discretion, to
                suspend or terminate your access to the Website and its services at any time and for
                any reason, including but not limited to a violation of this Agreement.
              </li>
              <li class="mb-3">
                Entire Agreement: This Agreement constitutes the entire agreement between you and
                CloudSharePlus regarding your use of the Website and its services and supersedes any
                prior or contemporaneous agreements.
              </li>
              <li class="mb-3">
                Severability: If any provision of this Agreement is held to be invalid, illegal, or
                unenforceable, the remaining provisions shall continue in full force and effect.
              </li>
              <li class="mb-3">
                Waiver: The failure of CloudSharePlus to enforce any right or provision of this Agreement
                shall not constitute a waiver of that right or provision.
              </li>
              <li class="mb-3">
                By accessing or using the CloudSharePlus Website, you acknowledge that you have read,
                understood, and agreed to be bound by this Agreement.
              </li>
            </ul>
          </h4>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import '@/assets/landing-style.css'
import Nav from './Navigation.vue'
import Footer from './Footer.vue'
export default {
  components: {
    Nav,
    Footer
  }
}
</script>
