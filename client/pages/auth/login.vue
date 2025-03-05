<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm, useIsFormValid } from "vee-validate";
import { useAuthStore } from "@/stores/auth";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const authStore = useAuthStore()

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(4).max(20),
    password: z.string().min(6).max(20),
  })
);

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: formSchema,
  initialValues: {
    username: '',
    password: ''
  }
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.login(values)
    navigateTo('/dashboard')
  } catch (error) {
    // Handle login error
  }
})


const isValid = useIsFormValid()


</script>

<template>
  <form @submit.prevent="onSubmit" class="bg-white p-8 min-w-80 rounded space-y-4">
    <h2 class="font-bold text-2xl">Kirish</h2>

    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Foydalanuvchi</FormLabel>
        <FormControl>
          <Input type="text" placeholder="namuna" v-bind="componentField"/>
        </FormControl>
        <FormDescription>
          <!-- This is your public display name. -->
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Parol</FormLabel>
        <FormControl>
          <Input type="password" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          <!-- This is your public display name. -->
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" :disabled="!isValid || isSubmitting">
      Kirish
    </Button>
  </form>
</template>
