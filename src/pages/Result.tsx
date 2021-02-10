import React from 'react'
import { Button, Grid, Link, Typography } from '@material-ui/core'
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
    credit: {
      margin: 16,
    },
  })
)

export const Result: React.FC<ResultProps> = ({
  setViewState,
  score,
}: ResultProps) => {
  const classes = useStyles()

  const src = (() => {
    if (score < 50) return '/result1.jpg'
    else if (score < 80) return '/result2.jpg'
    else return '/result3.jpg'
  })()

  const tweet = () => {
    const text = `もあちゃんのギミチョコだいさくせん で\n 満腹度：${score} でした！\n\n#もあちゃんのギミチョコだいさくせん\n#BABYMETAL #さくら学院父兄パソコン部\n\nhttps://gimme-choco.ryochansq.vercel.app`
    const encodedText = encodeURIComponent(text)
    const intent = `https://twitter.com/intent/tweet?text=${encodedText}`
    window.open(intent)
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
      <Grid item container className={classes.credit}>
        <Grid item container justify="flex-end">
          <Typography variant="caption">
            絵：{' '}
            <Link href="https://twitter.com/suke_ma_suke" target="_blank">
              @suke_ma_suke
            </Link>
          </Typography>
        </Grid>
        <Grid item container justify="flex-end">
          <Typography variant="caption">
            開発：{' '}
            <Link href="https://twitter.com/ryochan_metal" target="_blank">
              @ryochan_metal
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
