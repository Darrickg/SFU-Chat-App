import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CourseView from '../views/CourseView.vue'
import LoginView from '../views/LoginView.vue'
import DiscussionView from '../views/DiscussionView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cmpt372',
    name: 'course',
    component: CourseView
  },
  {
    path: '/cmpt372/assignment-1',
    name: 'discussion',
    component: DiscussionView
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
