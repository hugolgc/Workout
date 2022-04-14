import { defineStore } from 'pinia'
import { musclesService } from '../services/muscles'

export const useMusclesStore = defineStore({
  id: 'muscles',
  state: () => ({
    muscles: []
  }),
  getters: {
    getAll: state => async () => {
      state.muscles = await musclesService.getAll()
    }
  }
})