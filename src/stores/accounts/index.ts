import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Account } from './types'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  const addAccount = () => {
    const newId = `acc-${Date.now()}`
    accounts.value.push({
      id: newId,
      label: [],
      type: 'Локальная',
      login: '',
      password: null,
    })
  }

  const removeAccount = (id: string) => {
    accounts.value = accounts.value.filter((acc) => acc.id !== id)
  }

  const updateAccount = (id: string, data: Partial<Omit<Account, 'id'>>) => {
    const account = accounts.value.find((acc) => acc.id === id)
    if (!account) return

    Object.assign(account, data)
  }

  return {
    accounts,
    addAccount,
    removeAccount,
    updateAccount,
  }
})
