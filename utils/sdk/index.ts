import $axios from 'axios'
import { EventEmitter } from 'eventemitter3'

import { isError, isNumber } from 'lodash'

import type { AxiosInstance, AxiosRequestConfig } from 'axios'

import type { UserType } from '~utils/types/User'

interface ResultData<T, U extends keyof SDK['errors']> {
  error: U
  message?: SDK['errors'][U]
  data: T | null
}

class SDK extends EventEmitter {
  pull: AxiosInstance
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  io!: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app!: any
  prevConnection = true
  user?: UserType
  lastTime: Date | null = null
  status: UserType | null = null

  baseURL =
    process.env.NEXT_PUBLIC_SDK_MODE === 'development'
      ? process.env.NEXT_PUBLIC_SDK_LOCAL
      : process.env.NEXT_PUBLIC_SDK_PUBLIC

  errors = {
    0: 'NO_ERR',
    1: 'UNKNOWN',
    401: 'Unauthorized'
  }

  tokenized = false

  constructor() {
    super()

    this.pull = $axios.create({
      baseURL: this.baseURL,

      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    })
  }

  result<T, U extends keyof SDK['errors']>(data: T | null, error?: Error | U): ResultData<T, U> {
    if (isNumber(error)) {
      return {
        error,
        message: this.errors[error],
        data
      }
    } else if (isError(error)) {
      return {
        error: 1 as U,
        message: error.message,
        data
      }
    }
    return {
      error: 0 as U,
      data
    }
  }

  async setToken(token: string) {
    this.pull.defaults.headers.common.Authorization = `Bearer ${token}`

    this.tokenized = true

    return true
  }

  async make<T>(options: AxiosRequestConfig, skipVerify = false) {
    try {
      const res = await this.pull(options)

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return this.result<T, 0>(res.data)
    } catch (err) {
      console.debug(err, 'here2')

      return this.result<T, 1>(null, err as 1)
    }
  }

  async setSockets() {
    console.debug('initializing sockets')
  }

  clear() {
    this.user = undefined
    this.pull.defaults.headers.common.Authorization = undefined
  }
}

export const sdk = new SDK()
