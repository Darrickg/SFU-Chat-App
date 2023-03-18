import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cmpt372',
    name: 'course',
    component: () => import('../views/CourseView.vue')
  },
  {
    path: '/cmpt372/assignment-1',
    name: 'discussion',
    component: () => import('../views/DiscussionView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
