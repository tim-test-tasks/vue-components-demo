import { createRouter, createWebHistory } from 'vue-router'
import AccountsLayout from '@/components/saasoftform/AccountsLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/saasoftform', component: AccountsLayout }],
})

export default router
