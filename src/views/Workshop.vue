<script setup>
import moment from 'moment'
import { ref } from 'vue'
import { useWorkshopsStore } from '../stores/workshops'

const workshopStore = useWorkshopsStore()
const workshopSelected = ref(null)

function getDate(date) {
  moment.locale('fr')
  return moment(date).format('dddd D MMM')
}

workshopStore.getAll()
</script>

<template>
  <h1 class="text-4xl font-semibold">Ateliers</h1>


  <ul v-if="workshopStore.workshops.length" class="space-y-4">
    <li v-for="workshop in workshopStore.workshops" class="flex justify-between px-4 py-3 bg-zinc-800 rounded-lg">
      <span>{{ getDate(workshop.fields.date) }}</span>
      <span class="text-white/25">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </span>
    </li>
  </ul>
  <div v-else class="space-y-4">
    <div v-for="loader in Array(6)" class="h-12 bg-zinc-800 rounded-lg"></div>
  </div>
</template>