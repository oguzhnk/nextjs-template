import '~styles/globals.css'

import { useMemo } from 'react'

import type { App as AppType } from '~types'
import type { TotalState } from '~utils/store'

import ErrorBoundary from '~components/ErrorBoundary'
import { GuardMaster } from '~guards'
import CommonProvider from '~utils/CommonProvider'
import * as layoutList from '~utils/layouts'
import { Provider, useCreateStore } from '~utils/store'

export interface AppPageProps {
  initialZustandState?: Partial<TotalState>
}

const App: AppType<AppPageProps> = props => {
  const { Component, pageProps, initialZustandState } = props

  const Layout = layoutList[Component.layout ?? 'default']
  const guards = Component.guards ?? []

  const store = useCreateStore(initialZustandState)

  const value = useMemo(() => {
    return store()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialZustandState, store])

  return (
    <Provider value={value}>
      <CommonProvider pageProps={pageProps}>
        <GuardMaster guards={guards}>
          <Layout pageProps={pageProps}>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </Layout>
        </GuardMaster>
      </CommonProvider>
    </Provider>
  )
}

export default App
