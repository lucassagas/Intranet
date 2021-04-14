import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://100.83.5.155:11111/intranet'
})
