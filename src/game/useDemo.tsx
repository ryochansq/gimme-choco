import { useEffect, useState, useRef } from 'react'

import { drawMoa, drawDemoChoco } from 'game/draw'

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

export const useDemo = (): [
  (canvas: HTMLCanvasElement) => void,
  (direction: 'left' | 'right', isDown: boolean) => void
] => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [isLeft, setIsLeft] = useValueRef(false)
  const [isRight, setIsRight] = useValueRef(false)
  const [prevMoaLane, setPrevMoaLane] = useValueRef<Lane>(1)
  const [a, setA] = useValueRef(360)
  const [moaTransition, setMoaTransition] = useValueRef<MoaTransition | null>(
    null
  )
  const moaLane = (): Lane => {
    if (isLeft.current) return 0
    else if (isRight.current) return 2
    else return 1
  }

  const update = () => {
    if (!ctx) return
    ctx.clearRect(0, 0, a.current, a.current)
    drawMoa(
      ctx,
      moaLane(),
      prevMoaLane.current,
      a.current,
      null,
      moaTransition.current,
      true
    )
    drawDemoChoco(ctx, a.current)
    updateMoaTransition()
  }

  const updateMoaTransition = () => {
    const nowLane = moaLane()
    if (prevMoaLane.current === nowLane)
      setMoaTransition((tr) => {
        if (!tr || tr.frameLength === 0) return null
        return {
          ...tr,
          frameLength: tr.frameLength - 1,
        }
      })
    else {
      setMoaTransition({
        from: prevMoaLane.current,
        to: nowLane,
        frameLength: 1,
      })
      setPrevMoaLane(nowLane)
    }
  }

  const init = (canvas: HTMLCanvasElement) => {
    const parent = canvas.parentNode
    canvas.width = (parent as HTMLBaseElement).clientWidth * 0.8
    canvas.height = canvas.width * 0.55
    const context = canvas.getContext('2d')
    if (!context) return
    setCtx(context)
    setA(canvas.width)
  }

  // created相当
  useEffect(() => {
    if (!ctx) return
    const interval = setInterval(update, 30)
    return () => clearInterval(interval)
  }, [ctx])

  const onMove = (direction: 'left' | 'right', isDown: boolean) => {
    if (direction === 'left') setIsLeft(isDown)
    else setIsRight(isDown)
  }

  return [init, onMove]
}
