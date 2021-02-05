const MOA_SIZE = 30
const CHOCO_SIZE = 12

const moa = new Image()
moa.src = '/moa.png'

const choco = new Image()
choco.src = '/choco.png'

const poison = new Image()
poison.src = '/poison.png'

export const drawMoa = (
  ctx: CanvasRenderingContext2D,
  isLeft: boolean,
  isRight: boolean,
  a: number
): void => {
  const scale = (a / moa.width / 100) * MOA_SIZE
  const nx = (() => {
    const x0 = 25
    const interval = 50 - x0
    if (isLeft) return x0
    else if (isRight) return x0 + interval * 2
    else return 25 + interval * 1
  })()
  const x = (a / 100) * (nx - MOA_SIZE / 2)
  const y = (a / 100) * 85
  ctx.drawImage(moa, x, y, moa.width * scale, moa.height * scale)
}

export const calcChocoPoint = (chocoList: Choco[]): ChocoPoint[] =>
  chocoList.map((choco) => {
    return {
      isChoco: choco.isChoco,
      nx: 20 + choco.lane * 30 - CHOCO_SIZE / 2,
      ny: 0.02 * choco.frame * choco.frame - 20,
    }
  })

export const drawChoco = (
  ctx: CanvasRenderingContext2D,
  a: number,
  chocoPoint: ChocoPoint
): void => {
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
