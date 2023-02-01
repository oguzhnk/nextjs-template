import { Button, Container, createStyles, Group, Text, Title } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'
import Link from 'next/link'

import type { Page } from '~types'

import Illustration from '~components/404Illustration'

const useStyles = createStyles(theme => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80
  },

  inner: {
    position: 'relative'
  },

  image: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 0,
    opacity: 0.75
  },

  content: {
    paddingTop: 220,
    position: 'relative',
    zIndex: 1,

    [theme.fn.smallerThan('sm')]: {
      paddingTop: 120
    }
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32
    }
  },

  description: {
    maxWidth: 540,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5
  }
}))

const ErrorPage: Page = function () {
  const { classes } = useStyles()
  const { ref, width } = useElementSize()

  return (
    <Container className={classes.root} ref={ref} sx={{ opacity: width === 0 ? 0 : 1, transition: 'opacity .2s ease' }}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>{'Page Not Found'}</Title>
          <Text align={'center'} className={classes.description} color={'dimmed'} size={'lg'}>
            {
              'Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL. If you think this is an error contact support.'
            }
          </Text>
          <Group position={'center'}>
            <Link href={'/'}>
              <Button size={'md'}>{'Take me back to home page'}</Button>
            </Link>
          </Group>
        </div>
      </div>
    </Container>
  )
}

ErrorPage.layout = 'auth'

export default ErrorPage
