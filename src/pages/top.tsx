import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    button: {},
  })
)

const Top: React.FC<Props> = ({ setViewState }: Props) => {
  const classes = useStyles()

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

export default Top
