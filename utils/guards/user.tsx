import type { ReactNode } from 'react'
import type { CC } from '~types'

export const User: CC<{
  children: ReactNode
}> = ({ children }: { children: ReactNode }) => {
  return <>{children}</>
}
