<script setup>
import { ref } from 'vue'
import { musclesService } from '../services/muscles'
import { useMusclesStore } from '../stores/muscles'
import { formValidator } from '../validators/form'

const musclesStore = useMusclesStore()
const name = ref('')

async function handleSubmit() {
  if (!formValidator.input(name.value)) return
  const muscle = await musclesService.create(name.value)
  
  if (!muscle) return
  musclesStore.muscles.push(muscle)
  name.value = ''
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
    <button type="submit" class="w-full px-4 py-3 bg-zinc-700 rounded-lg font-medium">Ajouter</button>
  </form>
  <ul v-if="musclesStore.muscles.length" class="space-y-4">
    <li v-for="muscle in musclesStore.muscles" class="flex justify-between px-4 py-3 bg-zinc-800 rounded-lg">
      <span>{{ muscle.fields.name }}</span>
      <span class="text-white/50">{{ '3 exercices' }}</span>
    </li>
  </ul>
  <div v-else class="space-y-4">
    <div v-for="muscle in Array(6)" class="h-12 bg-zinc-800 rounded-lg"></div>
  </div>
</template>