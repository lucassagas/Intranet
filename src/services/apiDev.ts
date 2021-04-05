import axios from 'axios'

export const apiDev = axios.create({
  baseURL: 'http://localhost:3001'
})
