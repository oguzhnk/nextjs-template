import { Box, Loader, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { shallow } from 'zustand/shallow'

import type { CC } from '~types'

import { useStore } from '~utils/store'

export type Guards = 'user'

export const GuardMaster: CC<{
  guards: Guards[]
  children: JSX.Element
}> = ({ children }) => {
  const { isLogin, activeUserId, setToken } = useStore(
    'global',
    state => ({
      isLogin: state.isLogin!,
      setToken: state.setToken!,
      activeUserId: state.activeUserId!
    }),
    shallow
  )
  const { initialized, toggleInitialized } = useStore(
    'temp',
    state => ({
      initialized: state.initialized!,
      toggleInitialized: state.toggleInitialized!
    }),
    shallow
  )

  const { colorScheme, colors } = useMantineTheme()
  const { replace, asPath } = useRouter()

  const checkRoute = useCallback(async () => {
    if (!isLogin && asPath !== '/login') {
      await replace('/login')
    }

    if (!initialized) {
      await setToken()

      if (isLogin) {
        // const { data, error } = await sdk.verify();

        console.debug('initialized')
        toggleInitialized(true)
      } else {
        toggleInitialized(true)
      }
    } else if (isLogin && asPath === '/login') {
      await replace('/')
    }
  }, [asPath, initialized, isLogin, replace, setToken, toggleInitialized])

  useEffect(() => {
    checkRoute().catch(error => {
      console.log(error)
    })
  }, [activeUserId, asPath, checkRoute, initialized, isLogin, replace, setToken, toggleInitialized])

  return initialized ? (
    <>{children}</>
  ) : (
    <Box
      style={{
        position: 'absolute',
        height: '100vh',
        width: '100vw',
        top: '0',
        left: '0',
        background: colorScheme === 'dark' ? colors.dark[9] : '#fdfdfd',
        zIndex: Number.MAX_SAFE_INTEGER,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Loader size={'xl'} variant={'bars'} />
    </Box>
  )
}
