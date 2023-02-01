import { LoadingOverlay, ScrollArea } from '@mantine/core'

import { shallow } from 'zustand/shallow'

import type { AppProps } from 'next/app'

import type { Page } from '~types'

import { useStore } from '~utils/store'

const DefaultLayout: Page<{
  pageProps: AppProps['pageProps']
}> = props => {
  const { children } = props

  const { isLoading, loadingLevel } = useStore(
    'temp',
    state => ({
      isLoading: state.isLoading!,
      setIsLoading: state.setIsLoading!,
      loadingLevel: state.loadingLevel!,
      setLoadingLevel: state.setLoadingLevel!
    }),
    shallow
  )

  return (
    <ScrollArea
      styles={{
        viewport: {
          paddingBottom: 0
        }
      }}
      sx={{
        width: '100%',
        height: '100vh'
      }}
      offsetScrollbars={true}
    >
      <LoadingOverlay
        loaderProps={{ size: 'lg', variant: 'bars' }}
        overlayOpacity={0.45}
        visible={isLoading && loadingLevel === 0}
      />

      {children}
    </ScrollArea>
  )
}

export default DefaultLayout
