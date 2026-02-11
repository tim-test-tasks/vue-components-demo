<script setup lang="ts">
import { computed } from 'vue'
import AccountForm from '@/components/saasoftform/AccountForm.vue'
import { useAccountsStore } from '@/stores/accounts'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { CircleQuestionMark, PlusIcon } from 'lucide-vue-next'

const store = useAccountsStore()

const accounts = computed(() => store.accounts)

const addAccount = () => store.addAccount()
const removeAccount = (id: string) => store.removeAccount(id)

const GRID = 'grid grid-cols-[2fr_1fr_2fr_2fr_40px] gap-4 items-center'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground flex justify-center py-4">
    <div class="w-full px-4">
      <Card>
        <CardHeader class="flex flex-row items-center gap-4">
          <div>
            <CardTitle class="text-2xl"> Учетные записи </CardTitle>
          </div>

          <Button
            variant="prominent"
            size="icon-lg"
            @click="addAccount"
            aria-label="Добавить учетную запись"
          >
            <PlusIcon />
          </Button>
        </CardHeader>

        <CardContent class="space-y-6">
          <div class="bg-sky-100 flex items-center rounded-sm py-2 px-4 gap-2">
            <CircleQuestionMark />
            <p class="text-base text-primary leading-tight">
              Для указания нескольких меток для одной пары логин/пароль исползьуйте разделитель
              точку с запятой <strong>;</strong>
            </p>
          </div>

          <div v-if="accounts.length === 0" class="text-sm text-muted-foreground italic">
            Нет учетных записей. Нажмите «+», чтобы добавить первую.
          </div>

          <div v-else class="space-y-4">
            <div class="px-4">
              <div :class="GRID" class="text-sm font-medium text-muted-foreground">
                <span>Метки</span>
                <span>Тип записи</span>
                <span>Логин *</span>
                <span>Пароль *</span>
                <span></span>
              </div>
            </div>

            <div class="space-y-2">
              <AccountForm
                v-for="account in accounts"
                :key="account.id"
                :account="account"
                @delete="removeAccount"
                :grid="GRID"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
