import { useEffect, useState, useRef } from 'react'

function useValueRef<T>(
  val: T
): [React.MutableRefObject<T>, React.Dispatch<React.SetStateAction<T>>] {
  const [v, setV] = useState<T>(val)
  const ref = useRef(v)
  useEffect(() => {
    ref.current = v
  }, [v])
  return [ref, setV]
}

const moa = new Image()
moa.src = '/moa.jpg'

const useGame = ({
  setViewState,
  score,
  setScore,
}: GameProps): [
  (canvas: HTMLCanvasElement) => void,
  (direction: 'left' | 'right', isDown: boolean) => void
] => {
  const [time, setTime] = useState(500)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [isLeft, setIsLeft] = useValueRef(false)
  const [isRight, setIsRight] = useValueRef(false)
  const [a, setA] = useValueRef(360)
  const [x, setX] = useValueRef(0)
  const [y, setY] = useValueRef(0)

  const drawMoa = () => {
    if (!ctx) return
    const scale = (a.current * 0.2) / moa.width
    ctx.drawImage(
      moa,
      x.current,
      y.current,
      moa.width * scale,
      moa.height * scale
    )
  }

  const draw = () => {
    if (!ctx) return
    ctx.clearRect(0, 0, a.current, a.current)
    drawMoa()
    if (isLeft.current && x.current >= 0) setX((cx) => cx - 5)
    else if (isRight.current && x.current <= a.current) setX((cx) => cx + 5)
  }

  const init = (canvas: HTMLCanvasElement) => {
    const parent = canvas.parentNode
    canvas.width = (parent as HTMLBaseElement).clientWidth
    canvas.height = canvas.width
    const context = canvas.getContext('2d')
    if (!context) return
    setCtx(context)
    setA(canvas.width)
    setX(canvas.width / 2)
    setY(canvas.width / 2)
  }

  useEffect(() => {
    if (!ctx) return
    const interval = setInterval(draw, 20)
    return () => clearInterval(interval)
  }, [ctx])

  // useEffect(() => {
  //   if (time === 0) {
  //     setScore(444)
  //     setTimeout(() => setViewState('Result'), 1000)
  //   } else {
  //     setTimeout(() => setTime((time) => time - 1), 1000)
  //   }
  // }, [time])

  const onMouse = (direction: 'left' | 'right', isDown: boolean) => {
    if (direction === 'left') setIsLeft(isDown)
    else setIsRight(isDown)
  }

  return [init, onMouse]
}

export default useGame
