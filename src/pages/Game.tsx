import React, { useLayoutEffect, useRef } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import useGame from 'game/useGame'

const useStyles = makeStyles(() =>
  createStyles({
    score: {
      fontSize: 20,
      margin: 4,
      textAlign: 'center',
    },
    button: {
      fontSize: 28,
    },
  })
)

export const Game: React.FC<GameProps> = ({
  setViewState,
  score,
  setScore,
}: GameProps) => {
  const classes = useStyles()
  const canvasRef = useRef(null)
  const [init, onMouse] = useGame({ setViewState, setScore })
  useLayoutEffect(() => {
    document.addEventListener('keydown', (event) => onKey(event, true), false)
    document.addEventListener('keyup', (event) => onKey(event, false), false)
    const canvas = canvasRef.current
    canvas && init(canvas)
  }, [])

  const onKey = (event: KeyboardEvent, isDown: boolean) => {
    if (event.key === 'Left' || event.key === 'ArrowLeft') {
      onMouse('left', isDown)
      event.preventDefault()
    } else if (event.key === 'Right' || event.key === 'ArrowRight') {
      onMouse('right', isDown)
      event.preventDefault()
    }
  }

  // TODO: 左右ボタンの大きさをもう少し大きくする？

  return (
    <div style={{ width: '100%' }}>
      <canvas ref={canvasRef} />
      <Typography className={classes.score}>ゲットした数： {score}</Typography>
      <Grid container direction="row" justify="center" spacing={6}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onMouseDown={() => onMouse('left', true)}
            onMouseUp={() => onMouse('left', false)}
            onMouseLeave={() => onMouse('left', false)}
            onTouchStart={() => onMouse('left', true)}
            onTouchEnd={() => onMouse('left', false)}
            className={classes.button}
          >
            ←
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onMouseDown={() => onMouse('right', true)}
            onMouseUp={() => onMouse('right', false)}
            onMouseLeave={() => onMouse('right', false)}
            onTouchStart={() => onMouse('right', true)}
            onTouchEnd={() => onMouse('right', false)}
            className={classes.button}
          >
            →
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
