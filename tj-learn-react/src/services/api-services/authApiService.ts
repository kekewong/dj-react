import { api } from '../api'

type LoginRequestDto = {
  username: string
  password: string
}

export const authApiService = {
  login: async (data: LoginRequestDto) => {
    return api.post('/login', data)
  }
}
