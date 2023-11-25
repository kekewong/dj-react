import { api } from '../api'

export type AddUserRequestDto = {
  username: string
  password: string
}

export type CreateUserRequestDto = {
  name: string | undefined
  username: string | undefined
  phoneNo: string | undefined
  isActive: boolean | undefined
  password: string | undefined
}

export type UpdateUserRequestDto = {
  id: number
  name: string | undefined
  phoneNo: string | undefined
  isActive: boolean | undefined
  password: string | undefined
}

export type UserDto = {
  id: number
  name: string
  username: string
  phoneNo: string
  createDate: Date
  isActive: boolean
}

export const userApiService = {
  getUsers: async (username: string) => {
    return api.post<UserDto[]>(`/users?username=${username}`)
  },
  getUser: async (id: number) => {
    return api.get<UserDto>(`/users/${id}`)
  },
  update: async (data: UpdateUserRequestDto) => {
    return api.put('/users', data)
  },
  create: async (data: CreateUserRequestDto) => {
    return api.post('/users', data)
  }
}
