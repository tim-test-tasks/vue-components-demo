<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground flex justify-center py-4">
    <div class="w-full px-4">
      <Card>
        <CardHeader class="flex flex-row items-center gap-4">
          <div>
            <CardTitle class="text-2xl"> Routes: </CardTitle>
          </div>
        </CardHeader>

        <CardContent class="space-y-6">
          <RouterLink to="/saasoftform" class="text-blue-500 hover:underline">
            Go to Accounts Layout
          </RouterLink>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
