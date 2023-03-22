import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CourseView from '../views/CourseView.vue'
import LoginPage from '../components/LoginPage/LoginPage.vue'
import DiscussionView from '../views/DiscussionView.vue'

const routes = [
  {
    path: '/',
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
    path: '/login',
    name: 'login',
    component: LoginPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
