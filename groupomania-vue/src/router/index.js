import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import PostCreate from '@/pages/PostCreate.vue'
import PostList from '@/pages/PostList.vue'
import PostEdit from '@/pages/PostEdit.vue'
import HomePage from '@/pages/HomePage.vue'
import LoginUser from '@/pages/LoginUser.vue'
import RegisterUser from '@/pages/RegisterUser.vue'
import UserProfile from '@/pages/UserProfile.vue'
import UserList from '@/pages/UserList.vue'
import NotFound from '@/pages/NotFound.vue'

const routes = [
  {
    path: '/posts/create',
    name: 'PostCreate',
    component: PostCreate,
   
  },
  {
    //path: '/posts/:id',
    path: '/posts/:id',
    name: 'PostEdit',
    component: PostEdit,
  }, 
  {
    path: '/posts',
    name: 'PostList',
    component: PostList,
  },
  {
    path: '/users',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/register',
    name: 'RegisterUser',
    component: RegisterUser,
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
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
  },
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
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
