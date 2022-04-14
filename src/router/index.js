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
    path: '/workshop',
    name: 'Workshop',
    component: () => import('../views/Workshop.vue')
  }
]

export const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes: routes })
