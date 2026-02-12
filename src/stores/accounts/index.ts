import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Account } from './types'

const STORAGE_KEY = 'accounts'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>(loadFromStorage())

  function loadFromStorage(): Account[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  function isAccountValid(acc: Account): boolean {
    if (!acc.login || acc.login.length > 100) return false

    if (acc.type === 'Локальная') {
      if (!acc.password || acc.password.length > 100) return false
    }

    if (acc.label.some((l) => l.text.length > 50)) return false

    return true
  }

  watch(
    accounts,
    (value) => {
      const validAccounts = value.filter(isAccountValid)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validAccounts))
    },
    { deep: true },
  )

  const addAccount = () => {
    accounts.value.push({
      id: `acc-${Date.now()}`,
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
