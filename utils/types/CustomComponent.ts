import type { FunctionComponent, ReactNode } from 'react'

export type CC<T = object> = FunctionComponent<
  T & {
    children?: ReactNode
  }
>
