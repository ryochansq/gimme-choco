import React, { useLayoutEffect, useRef } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { useGame } from 'game/useGame'
import { useListener } from 'game/useListener'

const useStyles = makeStyles((theme) =>
  createStyles({
    scoreText: {
      color: theme.palette.primary.main,
      fontSize: 20,
      fontWeight: 700,
    },
    score: {
      color: theme.palette.primary.main,
      fontSize: 28,
      fontWeight: 700,
      marginBottom: 3,
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
    const canvas = canvasRef.current
    canvas && init(canvas)
  }, [])
  useListener({ onMouse })

  return (
    <div style={{ width: '100%' }}>
      <canvas ref={canvasRef} />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <Typography className={classes.scoreText}>受け止めた数： </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.score}>{score}</Typography>
        </Grid>
      </Grid>
    </div>
  )
}
