import { mande } from 'mande'

// .ENV
const API = 'https://api.airtable.com/v0/appSuSjbVCpm8y6dW'
const TOKEN = 'keyewgm9mqGHbFBhY'

export const repositoryConfig = {
  get(route) {
    return mande(API + route, { headers: { Authorization: 'Bearer ' + TOKEN }})
  }
}