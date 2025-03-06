<script setup lang="ts">
import { useToast } from "@/components/ui/toast/use-toast";
import { watch } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const { toast } = useToast();

watch(
  () => authStore.error,
  (newError) => {
    if (newError !== null) {
      toast({
        title: "Authentication Error",
        description: newError,
        variant: "destructive",
      });

      authStore.clearError();
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="container mx-auto min-h-screen px-4 pt-40">
    <slot />
  </div>
  <ToastProvider />
</template>
