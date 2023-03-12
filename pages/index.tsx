import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { ActionIcon, Container, Group, Text } from '@mantine/core'
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
          <ArrowRightOnRectangleIcon height={22} width={22} />
        </ActionIcon>
      </Group>
    </Container>
  )
}

export default Home
