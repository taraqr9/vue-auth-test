<script setup>
import {ref, onMounted} from 'vue'
import api from '@/axios'
import {useRouter} from 'vue-router'

const token = ref(!!localStorage.getItem('token'))
const router = useRouter();
const user = ref({});

const fetchProfile = async () => {
  try {
    const response = await api.get('/profile')
    user.value = response.data.user
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
    localStorage.removeItem('token')
    await router.push('/')
  }
}

onMounted(() => {
  fetchProfile()
})

</script>

<template>
  <div class="about">
    <h1>This is an profile page</h1>
    <p>Name : {{ user.name }}</p>
    <p>Email : {{ user.email }}</p>
    <p>Phone : {{ user.phone }}</p>

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
