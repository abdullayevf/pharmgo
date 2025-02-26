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
import { Checkbox } from "@/components/ui/checkbox";
</script>

<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl"> Kirish </CardTitle>
      <CardDescription>
        Kirish uchun email va parolingizni tering.
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-4">
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="m@namuna.com" required />
      </div>
      <div class="grid gap-2">
        <Label for="password">Parol</Label>
        <Input id="password" type="password" required />
      </div>

      <div class="items-top flex gap-2">
        <Checkbox id="terms1" />
        <div class="grid gap-1.5 leading-none">
          <label
            for="terms1"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Meni eslab qol
          </label>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <div class="grid gap-2 w-full text-center">
        <Button class="w-full"> Kirish </Button>
        <p class="text-sm text-slate-400">
          Ro'yxatdan o'tmaganmisiz?
          <nuxt-link to="/auth/register" class="hover:text-black"
            >Ro'yxatdan o'tish</nuxt-link
          >
        </p>
      </div>
    </CardFooter>
  </Card>
</template>
