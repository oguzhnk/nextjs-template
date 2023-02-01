export * from './CustomComponent'
export * from './Common'
export * from './Page'
export * from './App'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetElementType<T extends any[]> = T extends Array<infer U> ? U : never
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export type { Guards } from '../guards'
