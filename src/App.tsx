import React, { useState } from 'react'
import {
  AppBar,
  Container,
  createMuiTheme,
  Grid,
  ThemeProvider,
  Toolbar,
} from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { Top } from 'pages/Top'
import { Game } from 'pages/Game'
import { Result } from 'pages/Result'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#59210C',
    },
    secondary: {
      main: '#00acee',
    },
  },
})

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#F2EFBB',
      height: '100vh',
      minHeight: '100vh',
      touchAction: 'none',
      userSelect: 'none',
    },
    toolbar: {
      padding: 0,
    },
    title: {
      height: 24,
      width: 'auto',
      margin: '0 auto',
    },
    body: {
      padding: 0,
    },
  })
)

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('Top')
  const [score, setScore] = useState(0)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar variant="dense" className={classes.toolbar}>
            <img src="/title.png" className={classes.title} />
          </Toolbar>
        </AppBar>
        <Container maxWidth="xs" className={classes.body}>
          {(() => {
            switch (viewState) {
              case 'Result':
                return <Result setViewState={setViewState} score={score} />
              case 'Game':
                return (
                  <Game
                    setViewState={setViewState}
                    score={score}
                    setScore={setScore}
                  />
                )
              default:
                return <Top setViewState={setViewState} setScore={setScore} />
            }
          })()}
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default App
