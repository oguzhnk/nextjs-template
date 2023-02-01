import { ScrollArea, Group, Box } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

import type { AppProps } from 'next/app'
import type { ReactNode } from 'react'

import type { Page } from '~types'

import ColorSchemeToggler from '~components/ColorSchemeToggler'

const Auth: Page<{
  pageProps: AppProps['pageProps']
  children: ReactNode
}> = props => {
  const { children } = props

  const matches = useMediaQuery('(max-width: 576px)')

  return (
    <ScrollArea
      sx={{
        height: '100vh'
      }}
    >
      <Box>
        <Group
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1000
          }}
          spacing={4}
        >
          <ColorSchemeToggler />
        </Group>

        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            minHeight: '100vh',
            flexGrow: 1,
            padding: matches ? 12 : 32
          }}
        >
          {children}
        </main>
      </Box>
    </ScrollArea>
  )
}

export default Auth
