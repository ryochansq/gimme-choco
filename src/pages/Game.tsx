import React, { useEffect, useRef } from 'react'
import { Button, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import useGame from 'game/useGame'

const useStyles = makeStyles(() =>
  createStyles({
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
  const [init, onMouse] = useGame({ setViewState, score, setScore })
  useEffect(() => {
    const canvas = canvasRef.current
    canvas && init(canvas)
  }, [])

  return (
    <div style={{ width: '100%' }}>
      <canvas className="canvas" ref={canvasRef} />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={6}
      >
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
