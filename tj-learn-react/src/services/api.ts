import axios from 'axios'
import authConfig from 'src/configs/auth'

const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string
const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName) as string
export const api = axios.create({ baseURL: baseApiUrl })

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem(storedToken)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)
