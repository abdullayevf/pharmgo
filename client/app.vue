<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>

<template>
  <Toaster />
  <div class="bg-slate-200">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
