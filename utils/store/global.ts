import { getStore } from '.'

import { setCookie } from 'cookies-next'
import produce from 'immer'

import { create } from 'zustand'

import { createJSONStorage, persist } from 'zustand/middleware'

import type { ColorScheme } from '@mantine/core'
import type { StoreApi, UseBoundStore } from 'zustand'

import type { UserType } from '~utils/types/User'

import { persistOptions } from '~utils/persist'

import { sdk } from '~utils/sdk'

export interface GlobalState {
  token: string | null

  colorScheme: ColorScheme
  toggleColorScheme: (colorScheme?: ColorScheme) => void
  version: string
  isLogin: boolean
  activeUserId: UserType['id'] | null

  setToken: () => Promise<void>
  actionSignIn: (user: Partial<UserType>) => Promise<void>
  actionLogout: () => Promise<void>
}

export const initGlobalStore = (initial: Partial<GlobalState> = {}): UseBoundStore<StoreApi<GlobalState>> => {
  const store = create<GlobalState>()(
    persist<GlobalState>(
      (set, get) => ({
        token: null,

        colorScheme: 'dark',
        version: 'v0.0.0',
        isLogin: false,
        activeUserId: null,

        ...initial,

        toggleColorScheme: colorScheme => {
          if (!colorScheme) {
            colorScheme = get().colorScheme === 'dark' ? 'light' : 'dark'
          }

          setCookie('mantine-color-scheme', colorScheme, {
            maxAge: 60 * 60 * 24 * 30
          })

          set(
            produce(state => {
              state.colorScheme = colorScheme
            })
          )
        },

        setToken: async () => {
          const { token } = get()

          if (token) {
            await sdk.setToken(token)
          }
        },

        async actionSignIn(user) {
          set({
            isLogin: true,
            token: 'Bearer token',
            activeUserId: 0
          })

          // const { error, data } = await sdk.make<{
          //   accessToken: string
          //   user: UserType
          // }>(
          //   {
          //     method: 'POST',
          //     url: '/authentication',
          //     data: {
          //       strategy: 'local',
          //       ...user
          //     }
          //   },
          //   true
          // )

          // if (error) {
          //   throw error as unknown
          // }

          // if (data) {
          //   set({
          //     isLogin: true,
          //     token: data.accessToken,
          //     activeUserId: data.user.id
          //   })
          // }
        },

        async actionLogout() {
          const tempStore = getStore('temp')

          tempStore.setState({
            initialized: false
          })

          sdk.clear()

          set({
            isLogin: false,
            activeUserId: null,
            token: null
          })
        }
      }),
      {
        name: 'global-state',
        storage: createJSONStorage(() => persistOptions),
        version: 1
      }
    )
  )

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  sdk.on('security', async (data: keyof (typeof sdk)['errors']) => {
    if (data === 401) {
      console.debug('security issue')

      await store.getState().actionLogout()
    }
  })

  return store
}
