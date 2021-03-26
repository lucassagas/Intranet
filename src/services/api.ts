import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://10.10.0.169:11111',
  headers: {
    tokenaccess:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjE2Nzg5NzQ0LCJleHAiOjE2MTY4NzYxNDR9.F-2c-3_I0z2EHCz7OoUH7oh0OHUhSmvCFSXeSnvQWI0'
  }
})
