<script lang="ts">
export const description =
  "A simple login form with email and password. The submit button says 'Sign in'.";
export const iframeHeight = "600px";
export const containerClass =
  "w-full h-screen flex items-center justify-center px-4";
</script>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
</script>

<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl"> Ro'yxatdan o'tish </CardTitle>
      <CardDescription>
        Ro'yxatdan o'tish uchun kerakli ma'lumotlarni kiriting.
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-4">
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="m@namuna.com" required />
      </div>
      <div class="grid gap-2">
        <Label for="username">Foydalanuvhchi</Label>
        <Input id="username" type="text" placeholder="namuna" required />
      </div>
      <div class="grid gap-2">
        <Label for="password">Parol</Label>
        <Input id="password" type="password" required />
      </div>
    </CardContent>
    <CardFooter>
      <div class="grid gap-2 w-full text-center">
        <Button class="w-full"> Ro'yxatdan o'tish </Button>
        <p class="text-sm text-slate-400">
          Allaqachon ro'yxatdan o'tganmisiz?
          <nuxt-link to="/auth/login" class="hover:text-black">Kirish</nuxt-link>
        </p>
      </div>
    </CardFooter>
  </Card>
</template>
