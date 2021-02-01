import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

type ResultProps = Props & {
  score: number
}

const useStyles = makeStyles(() =>
  createStyles({
    button: {},
  })
)

const Result: React.FC<ResultProps> = ({
  setViewState,
  score,
}: ResultProps) => {
  const classes = useStyles()

  return (
    <div>
      <Typography variant="body1" color="inherit">
        満腹度：{score}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setViewState('Game')}
        className={classes.button}
      >
        もういちど遊ぶ！
      </Button>
    </div>
  )
}

export default Result
