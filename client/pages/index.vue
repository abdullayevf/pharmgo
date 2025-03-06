<template>
  <div
    class="bg-white py-8 px-20 rounded mx-auto flex justify-center flex-col items-center"
  >
    <h1 class="text-6xl font-bold text-center">Welcome to PharmGo</h1>
    <div class="buttons space-x-4 mt-8">
      <nuxt-link to="/auth/login"><Button>Kirish</Button></nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

</script>
