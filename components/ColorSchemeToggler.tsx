import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { ActionIcon } from '@mantine/core'
import { shallow } from 'zustand/shallow'

import type { CC } from '~types'

import { useStore } from '~utils/store'

export const ColorSchemeToggler: CC = function () {
  const { colorScheme, toggleColorScheme } = useStore(
    'global',
    state => ({
      colorScheme: state.colorScheme!,
      toggleColorScheme: state.toggleColorScheme!
    }),
    shallow
  )

  return (
    <ActionIcon
      sx={theme => ({
        color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6]
      })}
      size={'lg'}
      variant={'subtle'}
      onClick={() => {
        toggleColorScheme()
      }}
    >
      {colorScheme === 'dark' ? <MoonIcon height={22} width={22} /> : <SunIcon height={22} width={22} />}
    </ActionIcon>
  )
}
