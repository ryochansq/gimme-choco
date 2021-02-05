import React, { useEffect } from 'react'
import { Button, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    button: {},
  })
)

type TopProps = Props & {
  setScore: React.Dispatch<React.SetStateAction<number>>
}

export const Top: React.FC<TopProps> = ({
  setViewState,
  setScore,
}: TopProps) => {
  const classes = useStyles()

  useEffect(() => setScore(0), [])

  return (
    <div>
      <Typography variant="body1" color="inherit">
        MOAMETALを操作して、
        <br />
        チョコをたくさん受け止めよう！
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setViewState('Game')}
        className={classes.button}
      >
        スタート！
      </Button>
    </div>
  )
}
