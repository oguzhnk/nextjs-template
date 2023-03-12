import { Button, Container, createStyles, Group, Text, Title } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'
import { useRouter } from 'next/router'

import type { Page } from '~types'

import { Illustration } from '~components/503Illustration'

const useStyles = createStyles(theme => ({
  root: {
    paddingTop: 120,
    paddingBottom: 120
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
    opacity: 0.65
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
    color: theme.white,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32
    }
  },

  description: {
    maxWidth: 460,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: +theme.spacing.xl * 1.5,
    color: theme.colors[theme.primaryColor][1]
  }
}))

const ErrorPage: Page = function () {
  const { classes } = useStyles()
  const { reload } = useRouter()
  const { ref, width } = useElementSize()

  return (
    <div className={classes.root}>
      <Container ref={ref} sx={{ opacity: width === 0 ? 0 : 1, transition: 'opacity .2s ease' }}>
        <div className={classes.inner}>
          <Illustration className={classes.image} />
          <div className={classes.content}>
            <Title className={classes.title}>{'All of our servers are busy'}</Title>
            <Text align={'center'} className={classes.description} size={'lg'}>
              {
                'We cannot handle your request right now, please wait for a couple of minutes and refresh the page. Our team is already working on this issue.'
              }
            </Text>
            <Group position={'center'}>
              <Button
                color={'blue'}
                size={'md'}
                onClick={() => {
                  reload()
                }}
              >
                {'Refresh the page'}
              </Button>
            </Group>
          </div>
        </div>
      </Container>
    </div>
  )
}

ErrorPage.layout = 'auth'

export default ErrorPage
