import { initDataStore } from './data'
import { initGlobalStore } from './global'
import { initTempStore } from './temp'

import { useLayoutEffect, createContext, useContext } from 'react'
import { createStore, useStore as useBaseStore } from 'zustand'
import { devtools } from 'zustand/middleware'

import type { DataState } from './data'
import type { GlobalState } from './global'
import type { TempState } from './temp'
import type { StoreApi, UseBoundStore } from 'zustand'

/**
 * Types
 */

export interface TotalState {
  global: Partial<GlobalState>
  temp: Partial<TempState>
  data: Partial<DataState>
}

export interface TotalStoreWithoutApi {
  global: ReturnType<typeof initGlobalStore>
  temp: ReturnType<typeof initTempStore>
  data: ReturnType<typeof initDataStore>
}

export type TotalStore = StoreApi<TotalStoreWithoutApi>

let store: TotalStore
let api: TotalStoreWithoutApi

/**
 * Context
 */

const zustandContext = createContext<TotalStore | null>(null)
const initializeStore = (initialData: Partial<TotalState> = {}): TotalStore => {
  api = {
    ...api,

    global: initGlobalStore(initialData.global),
    temp: initTempStore(initialData.temp),
    data: initDataStore(initialData.data)
  }

  return createStore(devtools(() => api))
}

export const { Provider } = zustandContext

/**
 * Hooks
 */

export const getStore = <T extends keyof TotalState>(storeName: T): TotalStoreWithoutApi[T] => {
  return api[storeName]
}

export const useStore = <T extends keyof TotalState, U>(
  storeName: T,
  selector: (state: TotalState[T]) => U,
  equalityFn?: (a: U, b: U) => boolean
): U => {
  const mainStore = useContext(zustandContext)

  return useBaseStore(
    mainStore!,
    state => {
      return (state[storeName] as UseBoundStore<StoreApi<TotalState[T]>>)(selector)
    },
    equalityFn
  )
}

export function useCreateStore(serverInitialState: Partial<TotalState> = {}): () => TotalStore {
  if (typeof window === 'undefined') {
    return () => initializeStore(serverInitialState)
  }
  const isReusingStore = Boolean(store)
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  store = store ?? initializeStore(serverInitialState)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (serverInitialState && isReusingStore) {
      const avail = store.getState()

      for (const data of Object.entries(serverInitialState)) {
        const [storeName, storeData] = data as [keyof TotalStoreWithoutApi, object]

        /* eslint-disable @typescript-eslint/no-explicit-any */
        avail[storeName].setState({
          ...avail[storeName].getState(),
          ...storeData
        })
        /* eslint-enable @typescript-eslint/no-explicit-any */
      }
    }
  })

  return () => store
}
