const MOA_SIZE = 30
const CHOCO_SIZE = 12

const moa = new Image()
moa.src = '/moa.png'
const moaLeft = new Image()
moaLeft.src = '/moa.png'
const moaRight = new Image()
moaRight.src = '/moa.png'
const moaDamaged = new Image()
moaDamaged.src = '/moa.png'
const choco = new Image()
choco.src = '/choco.png'
const poison = new Image()
poison.src = '/poison.png'

export const drawMoa = (
  ctx: CanvasRenderingContext2D,
  lane: Lane,
  prevLane: Lane,
  a: number,
  moaStatus: MoaStatus | null,
  moaTransition: MoaTransition | null
): void => {
  const scale = (a / moa.width / 100) * MOA_SIZE
  const yScale = (() => {
    if (!moaStatus) return 1
    const key = moaStatus.frameLength % 5
    if (key === 0) return 0.97
    else if (key === 1 || key === 4) return 0.95
    else return 0.94
  })()
  const nx = (() => {
    const x0 = 25
    const interval = 50 - x0
    if (moaStatus?.id === 'DAMAGE') return 25 + interval * 1
    else if (moaTransition)
      return (
        x0 +
        interval *
          (lane -
            ((moaTransition.to - moaTransition.from) *
              (moaTransition.frameLength + 1)) /
              3)
      )
    else return x0 + interval * prevLane
  })()
  const x = (a / 100) * (nx - MOA_SIZE / 2)
  const y = (a / 100) * 85 + moa.height * (1 - yScale)
  ctx.drawImage(moa, x, y, moa.width * scale, moa.height * scale * yScale)
}

export const calcChocoPoint = (chocoList: Choco[]): ChocoPoint[] =>
  chocoList.map((choco) => {
    return {
      isChoco: choco.isChoco,
      nx: 20 + choco.lane * 30 - CHOCO_SIZE / 2,
      ny: 0.1 * choco.frame * choco.frame - CHOCO_SIZE,
    }
  })

export const calcCatchingList = (
  chocoList: Choco[],
  chocoPointList: ChocoPoint[],
  moaLane: Lane,
  moaStatus: MoaStatus | null
): boolean[] =>
  chocoList.map((choco, index) =>
    isCatching(choco.lane, chocoPointList[index].ny, moaLane, moaStatus)
  )

export const isCatching = (
  chocoLane: Lane,
  ny: number,
  moaLane: Lane,
  moaStatus: MoaStatus | null
): boolean => {
  if (moaStatus?.id === 'DAMAGE') return false
  if (chocoLane !== moaLane) return false
  return ny >= 93 && ny <= 108
}

export const drawChoco = (
  ctx: CanvasRenderingContext2D,
  a: number,
  chocoPoint: ChocoPoint
): void => {
  // TODO: チョコの画像の種類を増やして、ランダムに表示する？
  const scale = (a / choco.width / 100) * CHOCO_SIZE
  const x = (a / 100) * chocoPoint.nx
  const y = (a / 100) * chocoPoint.ny
  const element = chocoPoint.isChoco ? choco : poison
  ctx.drawImage(element, x, y, choco.width * scale, choco.height * scale)
}

export const drawChocoList = (
  ctx: CanvasRenderingContext2D,
  a: number,
  chocoPointList: ChocoPoint[]
): void => chocoPointList.forEach((chocoPoint) => drawChoco(ctx, a, chocoPoint))

export const drawCount = (
  ctx: CanvasRenderingContext2D,
  a: number,
  count: number
): void => {
  ctx.font = '20px sans-serif'
  const text1 = 'のこり'
  const measuredText1 = ctx.measureText(text1)
  const x1 = a - measuredText1.width - 4
  const y1 = 24
  ctx.fillText(text1, x1, y1)
  const text2 = `${100 - count}`
  const measuredText2 = ctx.measureText(text2)
  const x2 = a - measuredText2.width - 8
  const y2 = 24 * 2
  ctx.fillText(text2, x2, y2)
}
