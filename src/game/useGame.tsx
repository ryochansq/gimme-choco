import { useEffect, useState, useRef } from 'react'

import { drawMoa, drawChoco } from 'game/draw'

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

const useGame = ({
  setViewState,
  score,
  setScore,
}: GameProps): [
  (canvas: HTMLCanvasElement) => void,
  (direction: 'left' | 'right', isDown: boolean) => void
] => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [isLeft, setIsLeft] = useValueRef(false)
  const [isRight, setIsRight] = useValueRef(false)
  const [a, setA] = useValueRef(360)
  const [te, setTe] = useValueRef(0)

  const draw = () => {
    if (!ctx) return
    ctx.clearRect(0, 0, a.current, a.current * 1.2)
    drawMoa(ctx, isLeft.current, isRight.current, a.current)
    drawChoco(ctx, a.current, 0, te.current)
    setTe((ct) => ct + 1)
  }

  const init = (canvas: HTMLCanvasElement) => {
    const parent = canvas.parentNode
    canvas.width = (parent as HTMLBaseElement).clientWidth
    canvas.height = canvas.width * 1.2
    const context = canvas.getContext('2d')
    if (!context) return
    setCtx(context)
    setA(canvas.width)
  }

  useEffect(() => {
    if (!ctx) return
    const interval = setInterval(draw, 20)
    return () => clearInterval(interval)
  }, [ctx])

  const onMouse = (direction: 'left' | 'right', isDown: boolean) => {
    if (direction === 'left') setIsLeft(isDown)
    else setIsRight(isDown)
  }

  return [init, onMouse]
}

export default useGame
