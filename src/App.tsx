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

import Top from 'pages/top'

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
  const classes = useStyles()

  // const onClickStart = () => {
  //   const setModeFunc = (currentMode: ViewState) => {
  //     if (currentMode === 'Top') return 'Game'
  //     else if (currentMode === 'Game') return 'Result'
  //     else return 'Top'
  //   }
  //   setViewState(setModeFunc)
  // }

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
                return <div>りざると</div>
              case 'Game':
                return <div>げーむ</div>
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
