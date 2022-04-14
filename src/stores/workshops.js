import { defineStore } from 'pinia'
import { workshopsService } from '../services/workshops'

export const useWorkshopsStore = defineStore({
  id: 'workshops',
  state: () => ({
    workshops: []
  }),
  getters: {
    getAll: state => async () => {
      state.workshops = await workshopsService.getAll()
    }
  }
})