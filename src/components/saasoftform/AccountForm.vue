<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { ref, watch } from 'vue'
import type { Account } from '@/stores/accounts/types'
import { useAccountsStore } from '@/stores/accounts'
import { Trash2Icon } from 'lucide-vue-next'

const props = defineProps<{
  grid: string
  account: Account
}>()

const emit = defineEmits<{
  (e: 'delete', id: string): void
}>()

const store = useAccountsStore()

const form = ref({
  labelText: '',
  type: 'Локальная' as Account['type'],
  login: '',
  password: '',
})

const errors = ref({
  label: false,
  login: false,
  password: false,
})

const validateLabel = () => {
  errors.value.label = form.value.labelText.length > 50
}

const validateLogin = () => {
  errors.value.login = !form.value.login || form.value.login.length > 100
}

const validatePassword = () => {
  if (form.value.type === 'LDAP') {
    errors.value.password = false
    return
  }

  errors.value.password = !form.value.password || form.value.password.length > 100
}

const isValid = () => !errors.value.label && !errors.value.login && !errors.value.password

const parseLabels = (value: string) =>
  value
    .split(';')
    .map((v) => v.trim())
    .filter(Boolean)
    .map((text) => ({ text }))

watch(
  () => props.account,
  (account) => {
    form.value = {
      labelText: account.label.map((l) => l.text).join('; '),
      type: account.type,
      login: account.login,
      password: account.password || '',
    }
  },
  { immediate: true },
)

const saveAccount = () => {
  validateLabel()
  validateLogin()
  validatePassword()

  if (!isValid()) return

  store.updateAccount(props.account.id, {
    label: parseLabels(form.value.labelText),
    type: form.value.type,
    login: form.value.login,
    password: form.value.type === 'LDAP' ? null : form.value.password,
  })
}

watch(
  () => form.value.type,
  () => {
    validatePassword()
    saveAccount()
  },
)

const deleteAccount = () => {
  emit('delete', props.account.id)
}

const autoResize = (e: Event) => {
  const el = e.target as HTMLTextAreaElement
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}
</script>

<template>
  <div class="px-4">
    <div :class="grid">
      <Textarea
        ref="labelTextarea"
        v-model="form.labelText"
        placeholder="МЕТКА1; МЕТКА2"
        maxlength="50"
        class="resize-none overflow-hidden min-h-1"
        rows="1"
        @input="autoResize"
        @blur="
          () => {
            validateLabel()
            saveAccount()
          }
        "
      />

      <Select v-model="form.type" @update:model-value="saveAccount">
        <SelectTrigger class="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Локальная">Локальная</SelectItem>
          <SelectItem value="LDAP">LDAP</SelectItem>
        </SelectContent>
      </Select>

      <Input
        v-model="form.login"
        placeholder="Логин"
        :class="[
          'w-full',
          errors.login && 'ring-1 ring-red-500',
          form.type === 'LDAP' && 'col-span-2',
        ]"
        @blur="
          () => {
            validateLogin()
            saveAccount()
          }
        "
      />

      <Input
        v-if="form.type === 'Локальная'"
        v-model="form.password"
        placeholder="Пароль"
        type="password"
        class="w-full"
        :class="errors.password && 'ring-1 ring-red-500'"
        @blur="
          () => {
            validatePassword()
            saveAccount()
          }
        "
      />

      <Button variant="outline" size="icon" @click="deleteAccount">
        <Trash2Icon />
      </Button>
    </div>
  </div>
</template>

<style scoped>
textarea {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
