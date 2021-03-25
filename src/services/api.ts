import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://10.10.0.169:11111',
  headers: {
    tokenaccess:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjE2NzAyMTI0LCJleHAiOjE2MTY3ODg1MjR9.g-y4H0xr3eJW3O4KEWNsTE97kSwTxlQCQ72tH5-LSoU'
  }
})
