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
const giveMe = new Image()
giveMe.src = '/giveMe.png'
const chocolate = new Image()
chocolate.src = '/chocolate.png'
const finish = new Image()
finish.src = '/finish.png'

export const drawMoa = (
  ctx: CanvasRenderingContext2D,
  lane: Lane,
  prevLane: Lane,
  a: number,
  moaStatus: MoaStatus | null,
  moaTransition: MoaTransition | null,
  isDemo: boolean
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
    const x0 = isDemo ? 35 : 29
    const interval = 50 - x0
    if (moaStatus?.id === 'DAMAGE') return 50
    else if (moaTransition) {
      const to = moaTransition.to
      const from = moaTransition.from
      const frameLength = moaTransition.frameLength
      return x0 + (interval * (from * frameLength + to * (3 - frameLength))) / 3
    } else return x0 + interval * prevLane
  })()
  const ny = isDemo ? 0 : 65
  const x = (a / 100) * (nx - MOA_SIZE / 2)
  const y = (a / 100) * ny + moa.height * scale * (1 - yScale)
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

const isCatching = (
  chocoLane: Lane,
  ny: number,
  moaLane: Lane,
  moaStatus: MoaStatus | null
): boolean => {
  if (moaStatus?.id === 'DAMAGE') return false
  if (chocoLane !== moaLane) return false
  return ny >= 86 && ny <= 92
}

const drawChoco = (
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

export const drawStartText = (
  ctx: CanvasRenderingContext2D,
  a: number,
  frame: number
): void => {
  if (frame >= 40 && frame < 50) return
  const scale = a / giveMe.width
  const width = giveMe.width * scale
  const height = giveMe.height * scale
  const x = 0
  const y = a / 2 - height / 2
  const element = frame < 40 ? chocolate : giveMe
  ctx.drawImage(element, x, y, width, height)
}

export const drawFinishText = (
  ctx: CanvasRenderingContext2D,
  a: number
): void => {
  const scale = a / finish.width
  const width = finish.width * scale
  const height = finish.height * scale
  const x = 0
  const y = a / 2 - height / 2
  ctx.drawImage(finish, x, y, width, height)
}

export const drawDemoChoco = (
  ctx: CanvasRenderingContext2D,
  a: number
): void => {
  const width = (a / 100) * CHOCO_SIZE
  const x0 = (a / 100) * (11 - CHOCO_SIZE / 2)
  const y0 = (a / 100) * 7
  ctx.drawImage(chocoList[0], x0, y0, width, width)
  const x1 = (a / 100) * (89 - CHOCO_SIZE / 2)
  const y1 = (a / 100) * 7
  ctx.drawImage(chocoList[1], x1, y1, width, width)
  const x2 = (a / 100) * (89 - CHOCO_SIZE / 2)
  const y2 = (a / 100) * (48 - CHOCO_SIZE)
  ctx.drawImage(chocoList[2], x2, y2, width, width)
  const x3 = (a / 100) * (11 - CHOCO_SIZE / 2)
  const y3 = (a / 100) * (46 - CHOCO_SIZE)
  ctx.drawImage(hone, x3, y3, width, width)
  ctx.font = '12px sans-serif'
  ctx.fillStyle = 'red'
  const text = 'DANGER!!'
  const measuredText1 = ctx.measureText(text)
  const x4 = (a / 100) * 12 - measuredText1.width / 2
  const y4 = (a / 100) * 46 + 14
  ctx.fillText(text, x4, y4)
}
