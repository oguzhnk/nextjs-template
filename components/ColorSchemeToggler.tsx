import { ActionIcon } from '@mantine/core'
import { IconMoon, IconSunLow } from '@tabler/icons'
import { shallow } from 'zustand/shallow'

import type { CC } from '~types'

import { useStore } from '~utils/store'

const ColorSchemeToggler: CC = function () {
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
      {colorScheme === 'dark' ? <IconMoon size={22} /> : <IconSunLow size={22} />}
    </ActionIcon>
  )
}

export default ColorSchemeToggler
