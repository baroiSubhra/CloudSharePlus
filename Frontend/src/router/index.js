import { createRouter, createWebHistory } from 'vue-router'
import { session } from '@/utils/passage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LandingPage/LandingPageView.vue')
    },
    {
      path: '/terms-and-conditions',
      name: 'terms-and-conditions',
      component: () => import('../views/LandingPage/TermsAndConditions.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/Login.vue')
    },
    {
      path: '/shared/:id',
      name: 'shared',
      component: () => import('../views/Shared/SharedFileView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        requires_auth: true
      },
      component: () => import('../views/Dashboard/DashboardView.vue'),
      children: [
        {
          path: '',
          name: 'documents',
          component: () => import('../views/Dashboard/DashboardLayout/Layout.vue')
        },
        {
          path: 'recents',
          name: 'recents',
          component: () => import('../views/Dashboard/DashboardLayout/Layout.vue')
        },
        {
          path: 'favourites',
          name: 'favourites',
          component: () => import('../views/Dashboard/DashboardLayout/Layout.vue')
        },
        {
          path: 'trash',
          name: 'trash',
          component: () => import('../views/Dashboard/DashboardLayout/Layout.vue')
        }
      ]
    }
  ]
})

// Route guard
router.beforeEach(async (to, from, next) => {
  let isLoggedIn
  try {
    isLoggedIn = await session.getAuthToken()
  } catch (error) {
    isLoggedIn = false
  }
  if (to.matched.some((record) => record.meta.requires_auth)) {
    if (isLoggedIn) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    if (isLoggedIn && ['login'].includes(to.name)) {
      next({
        path: '/dashboard'
      })
    } else {
      next()
    }
  }
})

export default router
