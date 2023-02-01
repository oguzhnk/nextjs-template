import produce from 'immer'
import { create, type StoreApi, type UseBoundStore } from 'zustand'

import type { UserType } from '~utils/types/User'

export interface TempState {
  initialized: boolean
  toggleInitialized: (initialized?: boolean) => void

  isLoading: boolean
  setIsLoading: (value: boolean) => void

  loadingLevel: number
  setLoadingLevel: (value: number) => void

  computed: {
    readonly blankUser: UserType
  }
}

export const initTempStore = (initial: Partial<TempState> = {}): UseBoundStore<StoreApi<TempState>> => {
  return create<TempState>()((set, get) => ({
    initialized: false,
    toggleInitialized: initialized => {
      initialized = initialized ?? !get().initialized

      set(
        produce<TempState>(state => {
          state.initialized = initialized!
        })
      )
    },

    isLoading: false,
    setIsLoading: value => {
      set(
        produce<TempState>(state => {
          state.isLoading = value
        })
      )
    },

    loadingLevel: 0,
    setLoadingLevel: value => {
      set(
        produce<TempState>(state => {
          state.loadingLevel = value
        })
      )
    },

    computed: {
      get blankUser() {
        const result: UserType = {
          id: 0,
          email: '',
          password: ''
        }

        return result
      }
    },

    ...initial
  }))
}
