const moa = new Image()
moa.src = '/moa.png'

const choco = new Image()
choco.src = '/choco.png'

export const drawMoa = (
  ctx: CanvasRenderingContext2D,
  isLeft: boolean,
  isRight: boolean,
  a: number
): void => {
  const rate = 30
  const scale = (a / moa.width / 100) * rate
  const xPos = (() => {
    const x0 = 25
    const interval = 50 - x0
    if (isLeft) return x0
    else if (isRight) return x0 + interval * 2
    else return 25 + interval * 1
  })()
  const x = (a / 100) * (xPos - rate / 2)
  const y = (a / 100) * 80
  ctx.drawImage(moa, x, y, moa.width * scale, moa.height * scale)
}

export const drawChoco = (
  ctx: CanvasRenderingContext2D,
  a: number,
  lane: 0 | 1 | 2,
  frame: number
): void => {
  const rate = 10
  const scale = (a / choco.width / 100) * rate
  const x = (a / 100) * (20 + lane * 30 - rate / 2)
  const y = (a / 100) * (0.01 * frame * frame - 5)
  ctx.drawImage(choco, x, y, choco.width * scale, choco.height * scale)
}
