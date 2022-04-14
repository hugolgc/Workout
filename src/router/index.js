import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/exercises',
    name: 'Exercises',
    component: () => import('../views/Exercises.vue')
  },
  {
    path: '/muscles',
    name: 'Muscles',
    component: () => import('../views/Muscles.vue')
  },
  {
    path: '/workout',
    name: 'Workout',
    component: () => import('../views/Workout.vue')
  }
]

export const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes: routes })
