import { repositoryConfig } from '../config/repository'

const exercisesRepository = repositoryConfig.get('/exercises')

export const exercisesService = {
  async create(name, muscleId) {
    try {
      const exercises = await exercisesRepository.post({ records: [{ fields: {
        name: name,
        muscle: [muscleId]
      }}]})
      return exercises.records[0]
    } catch (e) {
      console.error(e)
      return null
    }
  },
  async getAll() {
    try {
      const exercises = await exercisesRepository.get()
      return exercises.records
    } catch (e) {
      console.error(e)
      return []
    }
  },
  async getOne(id) {
    try {
      return await exercisesRepository.get(id)
    } catch (e) {
      console.error(e)
      return null
    }
  }
}