import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import TwitterIcon from '@material-ui/icons/Twitter'

type ResultProps = CommonProps & {
  score: number
}

const useStyles = makeStyles((theme) =>
  createStyles({
    img: {
      width: '100%',
    },
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
    button: {
      color: 'white',
      textTransform: 'none',
      fontWeight: 700,
    },
  })
)

export const Result: React.FC<ResultProps> = ({
  setViewState,
  score,
}: ResultProps) => {
  const classes = useStyles()

  const src = (() => {
    if (score < 50) return '/result1.png'
    else if (score < 80) return '/result2.png'
    else return '/result3.jpg'
  })()

  const tweet = () => {
    console.info('tweet')
    // TODO: ツイート処理
  }

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <img src={src} className={classes.img} />
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        <Grid item>
          <Typography className={classes.scoreText}>満腹度： </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.score}>{score}</Typography>
        </Grid>
        {score === 100 && (
          <Grid item>
            <Typography className={classes.scoreText}>
              {'　'}パーフェクト！
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid item container direction="row" justify="center" spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setViewState('Top')}
            className={classes.button}
          >
            もういちど遊ぶ！
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={tweet}
            className={classes.button}
            startIcon={<TwitterIcon />}
          >
            Twitterで共有
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
