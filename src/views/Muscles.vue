<script setup>
import { ref } from 'vue'
import { musclesService } from '../services/muscles'
import { useMusclesStore } from '../stores/muscles'
import { formValidator } from '../validators/form'

const musclesStore = useMusclesStore()
const name = ref('')
const loading = ref(false)

async function handleSubmit() {
  if (!formValidator.text(name.value))  return alert('Nom trop long (32 max).')
  
  loading.value = true
  const muscle = await musclesService.create(name.value)
  
  if (!muscle) return
  musclesStore.muscles.push(muscle)
  
  name.value = ''
  loading.value = false
}

musclesStore.getAll()
</script>

<template>
  <h1 class="text-4xl font-semibold">Muscles</h1>
  <form @submit.prevent="handleSubmit()" method="post" class="pt-12 pb-16 space-y-4">
    <input
      v-model="name"
      type="text"
      placeholder="Nom du muscle"
      class="w-full px-4 py-3 bg-zinc-800 rounded-lg placeholder:text-white/50"
    />
    <button type="submit" class="w-full px-4 py-3 bg-zinc-700 rounded-lg font-medium">
      <span v-if="!loading">Ajouter</span>
      <svg v-else class="h-6 w-6 mx-auto text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </button>
  </form>
  <ul v-if="musclesStore.muscles.length" class="space-y-4">
    <li v-for="muscle in musclesStore.muscles" class="flex justify-between px-4 py-3 bg-zinc-800 rounded-lg">
      <span>{{ muscle.fields.name }}</span>
      <span class="text-white/50">{{ muscle.fields.exercises.length }} exercices</span>
    </li>
  </ul>
  <div v-else class="space-y-4">
    <div v-for="loader in Array(6)" class="h-12 bg-zinc-800 rounded-lg animate-pulse"></div>
  </div>
</template>