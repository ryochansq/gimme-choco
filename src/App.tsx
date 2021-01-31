import React, { useState } from 'react'
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'

type Mode = 'Top' | 'Game' | 'Result'

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>('Top')

  const onClickStart = () => {
    const setModeFunc = (currentMode: Mode) => {
      if (currentMode === 'Top') return 'Game'
      else if (currentMode === 'Game') return 'Result'
      else return 'Top'
    }
    setMode(setModeFunc)
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            ギミチョコ
          </Typography>
        </Toolbar>
      </AppBar>
      {mode === 'Top' && <p>とっぷ</p>}
      {mode === 'Game' && <p>げーむ</p>}
      {mode === 'Result' && <p>りざると</p>}
      <Button variant="contained" color="primary" onClick={onClickStart}>
        スタート！
      </Button>
    </div>
  )
}

export default App
