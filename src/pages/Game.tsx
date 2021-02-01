import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

type GameProps = Props & {
  setScore: React.Dispatch<React.SetStateAction<number>>
}

const useStyles = makeStyles(() =>
  createStyles({
    test: {},
  })
)

const Game: React.FC<GameProps> = ({ setViewState, setScore }: GameProps) => {
  const classes = useStyles()
  const [time, setTime] = useState(5)

  useEffect(() => {
    if (time === 0) {
      setScore(444)
      setTimeout(() => setViewState('Result'), 1000)
    } else {
      setTimeout(() => setTime((time) => time - 1), 1000)
    }
  }, [time])

  return (
    <div>
      <Typography className={classes.test} variant="body1" color="inherit">
        げーむ画面
      </Typography>
      <Typography>あと {time} 秒</Typography>
    </div>
  )
}

export default Game
