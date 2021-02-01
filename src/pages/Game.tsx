import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import useGame from 'game/useGame'

type GameProps = Props & {
  setScore: React.Dispatch<React.SetStateAction<number>>
}

const useStyles = makeStyles(() =>
  createStyles({
    button: {},
  })
)

const Game: React.FC<GameProps> = ({ setViewState, setScore }: GameProps) => {
  const classes = useStyles()
  const [canvasRef, onClickLeft, onClickRight] = useGame({
    setViewState,
    setScore,
  })

  return (
    <div>
      <canvas className="canvas" ref={canvasRef} />
      <Button
        variant="contained"
        color="primary"
        onClick={onClickLeft}
        className={classes.button}
      >
        ひだり
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={onClickRight}
        className={classes.button}
      >
        みぎ
      </Button>
    </div>
  )
}

export default Game
