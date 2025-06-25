<script setup>
import {ref} from 'vue'
import api from '@/axios'
import { useRouter } from 'vue-router'

// const token = ref(localStorage.getItem('token'));
const token = ref(!!localStorage.getItem('token'))
const router = useRouter();

async function getUser() {
  try {
    const response = await api.get('profile')
  } catch (err) {
    console.error('error: ' + err.message)
  }
}

async function handleSubmit() {
  if(token) {
    localStorage.removeItem('token');
    token.value = false;
    router.push('/')
  }
}

getUser()
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>

    <form class="space-y-6" @submit.prevent="handleSubmit">
      <button type="submit"
              v-if="token"
              class="flex w-50 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Logout
      </button>
    </form>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
