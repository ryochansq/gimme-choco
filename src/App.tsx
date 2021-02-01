import React, { useState } from 'react'
import {
  AppBar,
  Container,
  createMuiTheme,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { Top } from 'pages/Top'
import { Game } from 'pages/Game'
import { Result } from 'pages/Result'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8a0036',
    },
  },
})

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#feb',
      height: '100vh',
      minHeight: '100vh',
    },
    body: {},
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
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
              ギミチョコもあちゃん
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xs" className={classes.body}>
          {(() => {
            switch (viewState) {
              case 'Result':
                return <Result setViewState={setViewState} score={score} />
              case 'Game':
                return <Game setViewState={setViewState} setScore={setScore} />
              default:
                return <Top setViewState={setViewState} />
            }
          })()}
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default App
