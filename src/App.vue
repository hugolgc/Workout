<script setup>
import { RouterLink, RouterView } from 'vue-router'
import './assets/style.css'
</script>

<template>
  <div class="h-screen flex flex-col">
    <main class="flex-auto p-8 overflow-auto">
      <RouterView />
    </main>
    <footer class="flex-none">
      <nav class="flex justify-evenly items-center pt-4 pb-8 bg-zinc-800 rounded-t-xl">
        <RouterLink :to="{ name: 'Home' }">Statistiques</RouterLink>
        <RouterLink :to="{ name: 'Muscles' }">Muscles</RouterLink>
        <RouterLink :to="{ name: 'Exercises' }">Exercices</RouterLink>
        <RouterLink :to="{ name: 'Workshop' }">Ateliers</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<style scoped>
  footer {
    box-shadow: 0px -20px 20px #00000030;
  }
</style>