import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import TwitterIcon from '@material-ui/icons/Twitter'

type ResultProps = Props & {
  score: number
}

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      color: 'white',
      textTransform: 'none',
    },
  })
)

export const Result: React.FC<ResultProps> = ({
  setViewState,
  score,
}: ResultProps) => {
  const classes = useStyles()

  const tweet = () => {
    console.info('tweet')
  }

  return (
    <div>
      <Typography variant="body1" color="inherit">
        満腹度：{score}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setViewState('Top')}
        className={classes.button}
      >
        もういちど遊ぶ！
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={tweet}
        className={classes.button}
        startIcon={<TwitterIcon />}
      >
        Twitterで共有
      </Button>
    </div>
  )
}
