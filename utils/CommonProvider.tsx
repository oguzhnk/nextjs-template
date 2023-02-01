import { MantineProvider, ColorSchemeProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'

import Head from 'next/head'

import { shallow } from 'zustand/shallow'

import type { AppProps } from 'next/app'
import type { ReactNode } from 'react'

import type { Page } from '~types'

import RouterTransition from '~components/RouterTransition'
import { fontWeights } from '~utils/defaults'
import { useStore } from '~utils/store'

export const CommonProvider: Page<{
  pageProps: AppProps['pageProps']
  children: ReactNode
}> = ({ children }) => {
  const { colorScheme, toggleColorScheme } = useStore(
    'global',
    state => ({
      colorScheme: state.colorScheme!,
      toggleColorScheme: state.toggleColorScheme!
    }),
    shallow
  )

  return (
    <>
      <Head>
        <title>{'NextJSTemplate'}</title>
        <meta content={'minimum-scale=1, initial-scale=1, width=device-width'} name={'viewport'} />
        <link href={'/favicon-dark.png'} media={'(prefers-color-scheme: dark)'} rel={'icon'} type={'image/png'} />
        <link href={'/favicon-light.png'} media={'(prefers-color-scheme: light)'} rel={'icon'} type={'image/png'} />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{
            colorScheme,
            other: {
              fontWeights
            },
            globalStyles(theme) {
              return {
                body: {
                  overflowX: 'hidden',
                  background: theme.colorScheme === 'dark' ? theme.colors.dark[9] : '#FDFDFD'
                }
              }
            },
            white: '#fdfdfd',
            defaultRadius: 'md'
          }}
          withGlobalStyles={true}
          withNormalizeCSS={true}
        >
          <RouterTransition />
          <ModalsProvider>
            <NotificationsProvider position={'bottom-right'} zIndex={1000}>
              {children}
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

export default CommonProvider
