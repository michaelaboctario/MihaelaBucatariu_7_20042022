import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import HomePage from '@/pages/HomePage.vue'
import LoginUser from "@/pages/LoginUser.vue"
import RegisterUser from "@/pages/RegisterUser.vue"
import NotFound from "@/pages/NotFound.vue"

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/register',
    name: 'RegisterUser',
    component: RegisterUser,
  },
  {
    path: '/login',
    name: 'LoginUser',
    component: LoginUser,
  },
  {
    path: '/logout',
    name: 'LogoutUser',
    async beforeEnter () {
      await store.dispatch('auth/signOut')
      return { name: 'HomePage' }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to) {
    const scroll = {}
    if (to.meta.toTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'
    return scroll
  }
})

export default router
