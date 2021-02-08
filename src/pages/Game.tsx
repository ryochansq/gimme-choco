import React, { useLayoutEffect, useRef } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import useGame from 'game/useGame'

const useStyles = makeStyles(() =>
  createStyles({
    score: {
      fontSize: 20,
      marginBottom: 8,
      textAlign: 'center',
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
    document.addEventListener('keydown', onKey, false)
    document.addEventListener('keyup', onKey, false)
    document.addEventListener('touchstart', onTouch, false)
    document.addEventListener('touchend', onTouch, false)
    const canvas = canvasRef.current
    canvas && init(canvas)
    return () => {
      document.removeEventListener('keydown', onKey, false)
      document.removeEventListener('keyup', onKey, false)
      document.removeEventListener('touchstart', onTouch, false)
      document.removeEventListener('touchend', onTouch, false)
    }
  }, [])

  const onKey = (event: KeyboardEvent) => {
    const isDown = event.type === 'keydown'
    if (event.key === 'Left' || event.key === 'ArrowLeft')
      onMouse('left', isDown)
    else if (event.key === 'Right' || event.key === 'ArrowRight')
      onMouse('right', isDown)
    event.preventDefault()
  }

  const onTouch = (event: TouchEvent) => {
    const isDown = event.type === 'touchstart'
    const x = event.changedTouches.item(0)?.clientX
    if (x && x <= document.body.clientWidth / 2) onMouse('left', isDown)
    else onMouse('right', isDown)
    event.preventDefault()
  }

  return (
    <div style={{ width: '100%' }}>
      <canvas ref={canvasRef} />
      <Typography className={classes.score}>ゲットした数： {score}</Typography>
    </div>
  )
}
