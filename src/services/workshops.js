import { repositoryConfig } from '../config/repository'

const workshopsRepository = repositoryConfig.get('/workshops')

export const workshopsService = {
  async create(name) {
    try {
      const workshops = await workshopsRepository.post({ records: [{ fields: { name: name }}]})
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