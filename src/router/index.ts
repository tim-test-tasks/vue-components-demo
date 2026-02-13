import { createRouter, createWebHistory } from 'vue-router'
import AccountsLayout from '@/components/saasoftform/AccountsLayout.vue'
import HomePage from '@/components/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage },
    { path: '/saasoftform', component: AccountsLayout },
  ],
})

export default router
