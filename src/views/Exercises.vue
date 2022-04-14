<script setup>
import { ref } from 'vue'
import { exercisesService } from '../services/exercises'
import { useExercisesStore } from '../stores/exercises'
import { useMusclesStore } from '../stores/muscles'
import { formValidator } from '../validators/form'

const musclesStore = useMusclesStore()
const exercisesStore = useExercisesStore()

const name = ref('')
const muscleId = ref(null)

async function handleSubmit() {
  if (!formValidator.input(name.value) || !muscleId.value) return
  const exercise = await exercisesService.create(name.value, muscleId.value)
  
  if (!exercise) return
  exercisesStore.exercises.push(exercise)
  
  name.value = ''
  muscleId.value = null
}

musclesStore.getAll()
exercisesStore.getAll()
</script>

<template>
  <h1 class="text-4xl font-semibold">Exercices</h1>
  <form @submit.prevent="handleSubmit()" method="post" class="pt-12 pb-16 space-y-4">
    <select v-model="muscleId" class="w-full px-4 py-3 bg-zinc-800 rounded-lg appearance-none">
      <option :value="null">Choisir un muscle ici</option>
      <option v-for="muscle in musclesStore.muscles" :value="muscle.id">{{ muscle.fields.name }}</option>
    </select>
    <input
      v-model="name"
      type="text"
      placeholder="Nom de l'exercice"
      class="w-full px-4 py-3 bg-zinc-800 rounded-lg placeholder:text-white/50"
    />
    <button type="submit" class="w-full px-4 py-3 bg-zinc-700 rounded-lg font-medium">Ajouter</button>
  </form>
  <ul v-if="exercisesStore.exercises.length" class="space-y-4">
    <li v-for="exercise in exercisesStore.exercises" class="flex justify-between px-4 py-3 bg-zinc-800 rounded-lg">
      <span>{{ exercise.fields.name }}</span>
      <span class="text-white/50">{{ 'Dos' }}</span>
    </li>
  </ul>
  <div v-else class="space-y-4">
    <div v-for="muscle in Array(6)" class="h-12 bg-zinc-800 rounded-lg"></div>
  </div>
</template>