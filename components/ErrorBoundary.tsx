import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Button, Stack, Text, useMantineTheme } from '@mantine/core'

import React from 'react'

import type { ReactNode } from 'react'

import type { CC } from '~types'

const ErrorContent: CC<{
  onClick: () => void
}> = function ({ onClick }) {
  const theme = useMantineTheme()

  return (
    <Stack align={'center'} pt={'xl'}>
      <ExclamationTriangleIcon color={theme.colors.red[9]} height={22} width={22} />
      <Stack align={'center'} spacing={4}>
        <Text size={'xl'} weight={500}>
          {'Oops, there is an error!'}
        </Text>
        <Text color={'dimmed'} size={'xs'}>
          {"If it doesn't get better after refreshing, let the developers know."}
        </Text>
      </Stack>
      <Button color={'gray'} onClick={onClick}>
        {'Try again'}
      </Button>
    </Stack>
  )
}

// eslint-disable-next-line react/no-multi-comp, react/require-optimization
class ErrorBoundary extends React.Component {
  state: {
    hasError: boolean
  } = {
    hasError: false
  }

  constructor(public props: { children: ReactNode }) {
    super(props)
  }

  static getDerivedStateFromError(): { hasError: true } {
    return { hasError: true }
  }

  componentDidCatch(error: unknown, errorInfo: unknown): void {
    console.log({ error, errorInfo })
  }

  componentDidMount(): void {
    this.setState({ hasError: false })
  }

  render(): ReactNode {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return (
        <ErrorContent
          onClick={() => {
            this.setState({ hasError: false })
          }}
        />
      )
    }

    return children
  }
}

export default ErrorBoundary
