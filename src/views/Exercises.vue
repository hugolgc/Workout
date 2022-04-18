<script setup>
import { reactive } from 'vue'
import { workshopsService } from '../services/workshops'
import { exercisesService } from '../services/exercises'
import { useWorkshopsStore } from '../stores/workshops'
import { useExercisesStore } from '../stores/exercises'
import { useMusclesStore } from '../stores/muscles'
import { formValidator } from '../validators/form'
import { timeHelper } from '../helpers/time'
import moment from 'moment'

const musclesStore = useMusclesStore()
const exercisesStore = useExercisesStore()
const workshopsStore = useWorkshopsStore()

const exerciseForm = reactive({
  name: '',
  id: null,
  loading: false
})

const workshopForm = reactive({
  exerciceId: null,
  series: null,
  repetitions: null,
  weight: null,
  rest: null,
  loading: false
})

async function handleSubmitExercise() {
  if (!formValidator.text(exerciseForm.name)) return alert('Saisir un nom (32 caractères max).')
  if (!exerciseForm.id) return alert('Choisir un muscle.')

  exerciseForm.loading = true
  const exercise = await exercisesService.create(exerciseForm.name, exerciseForm.id)
  
  if (!exercise) return
  exercisesStore.exercises.push(exercise)
  
  exerciseForm.name = ''
  exerciseForm.id = null
  exerciseForm.loading = false
}

async function handleSubmitWorkshop() {
  if (!workshopForm.series) return alert('Chosir un nombre de séries.')
  if (!workshopForm.repetitions) return alert('Chosir un nombre de répétitions.')
  if (!workshopForm.rest) return alert('Chosir un temps de repos.')
  if (!formValidator.number(workshopForm.weight)) return alert('Saisir un poids valide.')

  workshopForm.loading = true
  const workshop = await workshopsService.create({ ...workshopForm, date: moment().format('YYYY-MM-DD') })

  if (!workshop) return
  console.log(workshop)
  workshopsStore.workshops.push(workshop)

  workshopForm.exerciceId = null
  workshopForm.series = null
  workshopForm.repetitions = null
  workshopForm.weight = null
  workshopForm.rest = null
  workshopForm.loading = false
}

musclesStore.getAll()
exercisesStore.getAll()
</script>

<template>
  <h1 class="text-4xl font-semibold">Exercices</h1>


  <form @submit.prevent="handleSubmitExercise()" method="post" class="pt-12 pb-16 space-y-4">
    <select v-model="exerciseForm.id" class="w-full px-4 py-3 bg-zinc-800 rounded-lg appearance-none">
      <option :value="null">Choisir un muscle ici</option>
      <option v-for="muscle in musclesStore.muscles" :value="muscle.id">{{ muscle.fields.name }}</option>
    </select>
    <input
      v-model="exerciseForm.name"
      type="text"
      placeholder="Nom de l'exercice"
      class="w-full px-4 py-3 bg-zinc-800 rounded-lg placeholder:text-white/50"
    />
    <button type="submit" class="w-full px-4 py-3 bg-zinc-700 rounded-lg font-medium">
      <span v-if="!exerciseForm.loading">Ajouter</span>
      <svg v-else class="h-6 w-6 mx-auto text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </button>
  </form>


  <ul v-if="exercisesStore.exercises.length" class="space-y-4">
    <li
      v-for="exercise in exercisesStore.exercises"
      @click="workshopForm.exerciceId = exercise.id"
      class="flex justify-between px-4 py-3 bg-zinc-800 rounded-lg"
    >
      <span>{{ exercise.fields.name }}</span>
      <span class="text-white/50">{{ musclesStore.getOne(exercise.fields.muscle[0]).fields.name }}</span>
    </li>
  </ul>
  <div v-else class="space-y-4">
    <div v-for="loader in Array(6)" class="h-12 bg-zinc-800 rounded-lg animate-pulse"></div>
  </div>


  <form
    v-if="workshopForm.exerciceId"
    @submit.prevent="handleSubmitWorkshop()"
    method="post"
    class="fixed inset-0 flex p-8"
  >
    <div @click="workshopForm.exerciceId = null" class="absolute inset-0 bg-black/75"></div>
    <div class="z-10 m-auto p-4 space-y-4 bg-zinc-900 rounded-xl">


      <select v-model="workshopForm.series" class="w-full px-4 py-3 bg-zinc-800 rounded-lg appearance-none">
        <option :value="null">Séries</option>
        <option v-for="(array, serie) in Array(10)" :value="serie + 1">{{ serie + 1 }} série{{ serie + 1 === 1 ? '' : 's' }}</option>
      </select>


      <select v-model="workshopForm.repetitions" class="w-full px-4 py-3 bg-zinc-800 rounded-lg appearance-none">
        <option :value="null">Répétitions</option>
        <option v-for="(array, repetition) in Array(50)" :value="repetition + 1">{{ repetition + 1 }} rep{{ repetition + 1 === 1 ? '' : 's' }}</option>
      </select>


      <select v-model="workshopForm.rest" class="w-full px-4 py-3 bg-zinc-800 rounded-lg appearance-none">
        <option :value="null">Repos</option>
        <option v-for="(array, rest) in Array(21)" :value="rest * 15">{{ timeHelper.secondesInMinutes(rest * 15) }}</option>
      </select>


      <input
        v-model="workshopForm.weight"
        type="number"
        step=".5"
        class="w-full px-4 py-3 bg-zinc-800 rounded-lg placeholder:text-white/50"
        placeholder="Poids en kg (ex: 45,5)"
      />


      <button type="submit" class="w-full px-4 py-3 bg-zinc-700 rounded-lg font-medium">
        <span v-if="!workshopForm.loading">Ajouter</span>
        <svg v-else class="h-6 w-6 mx-auto text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </button>
    </div>
  </form>
</template>