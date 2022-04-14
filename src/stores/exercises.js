import { defineStore } from 'pinia'
import { exercisesService } from '../services/exercises'

export const useExercisesStore = defineStore({
  id: 'exercises',
  state: () => ({
    exercises: []
  }),
  getters: {
    getAll: state => async () => {
      state.exercises = await exercisesService.getAll()
    }
  }
})