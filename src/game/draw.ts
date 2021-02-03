const moa = new Image()
moa.src = '/moa.jpg'

export const drawMoa = (
  ctx: CanvasRenderingContext2D,
  isLeft: boolean,
  isRight: boolean,
  a: number
): void => {
  const scale = (a / moa.width / 100) * 30
  const xPos = (() => {
    if (isLeft) return 15
    else if (isRight) return 55
    else return 35
  })()
  const x = (a / 100) * xPos
  const y = (a / 100) * 80
  ctx.drawImage(moa, x, y, moa.width * scale, moa.height * scale)
}
