import { repositoryConfig } from '../config/repository'

const workshopsRepository = repositoryConfig.get('/workshops')

export const workshopsService = {
  async create({ exerciceId, series, weight, rest, repetitions, date }) {
    try {
      const workshops = await workshopsRepository.post({ records: [{ fields: {
        exercice: [exerciceId],
        series: series,
        weight: weight,
        rest: rest,
        repetitions: repetitions,
        user: ['recOl0bbTVrtqMahT'],
        date: date
      }}]})
      return workshops.records[0]
    } catch (e) {
      console.error(e)
      return null
    }
  },
  async getAll() {
    try {
      const workshops = await workshopsRepository.get()
      return workshops.records
    } catch (e) {
      console.error(e)
      return []
    }
  },
  async getOne(id) {
    try {
      return await workshopsRepository.get(id)
    } catch (e) {
      console.error(e)
      return null
    }
  }
}