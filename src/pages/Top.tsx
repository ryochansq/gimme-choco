import React, { useLayoutEffect, useRef } from 'react'
import { Button, Grid, Link, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { useDemo } from 'game/useDemo'
import { useListener } from 'game/useListener'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      padding: 16,
    },
    hone: {
      color: theme.palette.primary.main,
      fontWeight: 700,
    },
  })
)

type TopProps = CommonProps & {
  setScore: React.Dispatch<React.SetStateAction<number>>
}

export const Top: React.FC<TopProps> = ({
  setViewState,
  setScore,
}: TopProps) => {
  const classes = useStyles()
  const canvasRef = useRef(null)
  const [init, onMouse] = useDemo()
  useLayoutEffect(() => {
    setScore(0)
    const canvas = canvasRef.current
    canvas && init(canvas)
  }, [])
  useListener({ onMouse })

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item>
        <Typography variant="body2" color="inherit">
          もあちゃんを左右に動かして、上から降ってくるチョコのお菓子をできるだけたくさん受け止めよう！
        </Typography>
      </Grid>
      <Grid container justify="center">
        <canvas ref={canvasRef} />
      </Grid>
      <Grid item>
        <Typography variant="body2" color="inherit">
          パソコン：「←」「→」キーで左右に動く
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="inherit">
          スマホ：画面の左側のどこかをタッチしていると左に、右側だと右に動く
        </Typography>
        <Typography variant="caption" color="inherit">
          （機種によってはタッチが速すぎると反応しないことがあります）
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="inherit">
          お菓子は全部で100コ。
        </Typography>
        <Typography variant="body2" color="inherit">
          <span className={classes.hone}>
            骨マスクを受け止めると集めたお菓子が減っちゃう
          </span>
          ので気をつけてね。
        </Typography>
      </Grid>
      <Grid item container justify="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setViewState('Game')}
        >
          ゲームスタート！
        </Button>
      </Grid>
      <Grid item container>
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
