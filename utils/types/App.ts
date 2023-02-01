import type { Page, PageAppendType } from './Page'

import type { AppProps } from 'next/app'

export type App<T = object, U = object> = Page<
  AppProps<U> &
    Partial<T> & {
      Component: PageAppendType
    },
  T
>
