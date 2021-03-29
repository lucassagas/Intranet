import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://10.10.0.169:11111',
  headers: {
    tokenaccess:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjE3MDMwMzEzLCJleHAiOjE2MTcxMTY3MTN9.7JxQf0SytpKnxQIdMBb9T4vqwqsjFuJqwWtiy-VKDCQ'
  }
})
