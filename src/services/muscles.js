import { repositoryConfig } from '../config/repository'

const musclesRepository = repositoryConfig.get('/muscles')

export const musclesService = {
  async create(name) {
    try {
      const muscles = await musclesRepository.post({ records: [{ fields: { name: name }}]})
      return muscles.records[0]
    } catch (e) {
      console.error(e)
      return null
    }
  },
  async getAll() {
    try {
      const muscles = await musclesRepository.get()
      return muscles.records
    } catch (e) {
      console.error(e)
      return []
    }
  },
  async getOne(id) {
    try {
      return await musclesRepository.get(id)
    } catch (e) {
      console.error(e)
      return null
    }
  }
}