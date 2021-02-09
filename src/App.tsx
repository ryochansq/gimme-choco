import React, { useState, useRef, useEffect } from 'react'
import {
  AppBar,
  Container,
  createMuiTheme,
  ThemeProvider,
  Toolbar,
} from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CSSTransition } from 'react-transition-group'

import 'App.scss'
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
  const [viewState, setViewState] = useState<ViewState>('')
  const [transitionState, setTransitionState] = useState<ViewState>('')
  const [score, setScore] = useState(0)
  const classes = useStyles()
  const resultRef = useRef(null)
  const gameRef = useRef(null)
  const topRef = useRef(null)

  useEffect(() => setViewState('Top'), [])

  useEffect(() => {
    setTimeout(() => setTransitionState(viewState), 200)
  }, [viewState])

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar variant="dense" className={classes.toolbar}>
            <img src="/title.png" className={classes.title} />
          </Toolbar>
        </AppBar>
        <Container maxWidth="xs" className={classes.body}>
          <CSSTransition
            nodeRef={resultRef}
            in={transitionState === 'Result' && viewState === 'Result'}
            timeout={{ enter: 800, exit: 200 }}
            unmountOnExit
            classNames="result"
          >
            <div ref={resultRef}>
              <Result setViewState={setViewState} score={score} />
            </div>
          </CSSTransition>
          <CSSTransition
            nodeRef={gameRef}
            in={transitionState === 'Game' && viewState === 'Game'}
            timeout={200}
            unmountOnExit
            classNames="common"
          >
            <div ref={gameRef}>
              <Game
                setViewState={setViewState}
                score={score}
                setScore={setScore}
              />
            </div>
          </CSSTransition>
          <CSSTransition
            nodeRef={topRef}
            appear
            in={transitionState === 'Top' && viewState === 'Top'}
            timeout={200}
            unmountOnExit
            classNames="common"
          >
            <div ref={topRef}>
              <Top setViewState={setViewState} setScore={setScore} />
            </div>
          </CSSTransition>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default App
