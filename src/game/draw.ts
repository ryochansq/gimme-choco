const MOA_SIZE = 35
const CHOCO_SIZE = 15

const moa = new Image()
moa.src = '/moa.png'
const moaLeft = new Image()
moaLeft.src = '/moaLeft.png'
const moaRight = new Image()
moaRight.src = '/moaRight.png'
const moaDamaged = new Image()
moaDamaged.src = '/moaDamaged.png'
const hone = new Image()
hone.src = '/hone.png'
const chocoList: HTMLImageElement[] = []
for (let i = 0; i < 3; i++) {
  chocoList.push(new Image())
  chocoList[i].src = `/choco${i}.png`
}

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
    if (key === 0) return 0.95
    else if (key === 1 || key === 4) return 0.92
    else return 0.9
  })()
  const nx = (() => {
    const x0 = 30
    const interval = 50 - x0
    if (moaStatus?.id === 'DAMAGE') return 50
    else if (moaTransition) {
      const to = moaTransition.to
      const from = moaTransition.from
      const frameLength = moaTransition.frameLength
      return x0 + (interval * (from * frameLength + to * (3 - frameLength))) / 3
    } else return x0 + interval * prevLane
  })()
  const x = (a / 100) * (nx - MOA_SIZE / 2)
  const y = (a / 100) * 65 + moa.height * scale * (1 - yScale)
  const img = (() => {
    if (moaStatus?.id === 'DAMAGE') return moaDamaged
    else if (lane === 0) return moaLeft
    else if (lane === 1) return moa
    else return moaRight
  })()
  ctx.drawImage(img, x, y, moa.width * scale, moa.height * scale * yScale)
}

export const calcChocoPoint = (chocoList: Choco[]): ChocoPoint[] =>
  chocoList.map((choco) => {
    return {
      isChoco: choco.isChoco,
      type: choco.type,
      nx: 20 + choco.lane * 30 - CHOCO_SIZE / 2,
      ny: 0.07 * choco.frame * choco.frame - CHOCO_SIZE,
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
  return ny >= 85 && ny <= 92
}

export const drawChoco = (
  ctx: CanvasRenderingContext2D,
  a: number,
  chocoPoint: ChocoPoint
): void => {
  const choco = chocoList[chocoPoint.type]
  const scale = (a / choco.width / 100) * CHOCO_SIZE
  const x = (a / 100) * chocoPoint.nx
  const y = (a / 100) * chocoPoint.ny
  const element = chocoPoint.isChoco ? choco : hone
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
