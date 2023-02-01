import { ActionIcon, Container, Group, Text } from '@mantine/core'
import { IconLogout } from '@tabler/icons'
import { useCallback } from 'react'
import { shallow } from 'zustand/shallow'

import type { Page } from '~types'

import { useStore } from '~utils/store'

const Home: Page = () => {
  const { actionLogout } = useStore(
    'global',
    state => ({
      actionLogout: state.actionLogout!
    }),
    shallow
  )

  const handleLogout = useCallback(async () => {
    try {
      await actionLogout()
    } catch (error) {}
  }, [actionLogout])

  return (
    <Container pt={'md'}>
      <Group position={'apart'}>
        <Text>{'Home'}</Text>

        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <ActionIcon size={'lg'} onClick={handleLogout}>
          <IconLogout size={20} />
        </ActionIcon>
      </Group>
    </Container>
  )
}

export default Home
