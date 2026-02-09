import { createRouter, createWebHistory } from 'vue-router'
import FormPage from '@/components/FormPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', component: FormPage }],
})

export default router
