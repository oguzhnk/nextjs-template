import { Button, Container, Paper, PasswordInput, Stack, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useHotkeys } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { useCallback } from 'react'

import { shallow } from 'zustand/shallow'

import type { Page } from '~types'

import { useStore } from '~utils/store'

const Login: Page = function () {
  const { actionSignIn } = useStore(
    'global',
    state => ({
      actionSignIn: state.actionSignIn!
    }),
    shallow
  )
  const { isLoading, setIsLoading } = useStore(
    'temp',
    state => ({
      isLoading: state.isLoading!,
      setIsLoading: state.setIsLoading!
    }),
    shallow
  )

  const form = useForm<{
    email: string
    password: string
  }>({
    initialValues: {
      email: '',
      password: ''
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid e-mail'),
      password: value =>
        value !== '' ? (value.length >= 8 ? null : 'Password must be greater than 8 character') : 'Password is required'
    }
  })

  const signin = useCallback(async () => {
    const validate = form.validate()

    if (validate.hasErrors) {
      return
    }

    try {
      setIsLoading(true)

      await actionSignIn(form.values)

      showNotification({
        color: 'green',
        title: 'Logged in',
        message: 'Login successful',
        autoClose: 3000
      })
    } catch (err) {
      console.error(err)

      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Login informations is wrong',
        autoClose: 3000
      })
    } finally {
      setIsLoading(false)
    }
  }, [form, setIsLoading, actionSignIn])

  useHotkeys([
    [
      'Enter',
      async () => {
        await signin()
      }
    ]
  ])

  return (
    <Container id={'login-form'} my={40} size={450} sx={{ width: '100%' }}>
      <Title
        sx={theme => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 600
        })}
        align={'center'}
        mb={8}
      >
        {'Login'}
      </Title>

      <Paper
        sx={theme => ({
          background: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.white
        })}
        mt={30}
        p={30}
        radius={'md'}
        shadow={'md'}
        withBorder={true}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.onSubmit(signin)}>
          <Stack mb={32} spacing={'xs'}>
            <TextInput
              autoComplete={'email'}
              disabled={isLoading}
              label={'E-Mail'}
              placeholder={'E-Mail'}
              required={true}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              autoComplete={'current-password'}
              disabled={isLoading}
              label={'Password'}
              placeholder={'Password'}
              required={true}
              {...form.getInputProps('password')}
            />
          </Stack>
          <Button fullWidth={true} loaderProps={{ variant: 'bars' }} loading={isLoading} type={'submit'}>
            {'Login'}
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

Login.layout = 'auth'

export default Login
