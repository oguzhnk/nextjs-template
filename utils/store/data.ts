import { create, type StoreApi, type UseBoundStore } from 'zustand'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DataState {}

export const initDataStore = (initial: Partial<DataState> = {}): UseBoundStore<StoreApi<DataState>> => {
  return create<DataState>()((set, get) => ({
    ...initial
  }))
}
