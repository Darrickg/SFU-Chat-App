import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CourseView from '../views/CourseView.vue'
import LoginView from '../views/LoginView.vue'
import DiscussionView from '../views/DiscussionView.vue'
import CourseChoosing from "@/components/CourseChoosing/CourseChoosing.vue";

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/discussion',
    name: 'discussion',
    component: DiscussionView
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/choose',
    name: 'chooseCourse',
    component: CourseChoosing
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
