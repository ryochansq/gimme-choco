import { useEffect, useState, useRef } from 'react'

import {
  drawMoa,
  calcChocoPoint,
  drawChocoList,
  drawCount,
  calcCatchingList,
} from 'game/draw'
import { makeEventQueue } from 'game/event'

const HEIGHT_RATE = 1.2

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
  setScore,
}: GameProps): [
  (canvas: HTMLCanvasElement) => void,
  (direction: 'left' | 'right', isDown: boolean) => void
] => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [isLeft, setIsLeft] = useValueRef(false)
  const [isRight, setIsRight] = useValueRef(false)
  const [a, setA] = useValueRef(360)
  const [chocoList, setChocoList] = useValueRef<Choco[]>([])
  const [count, setCount] = useValueRef(0)
  const [eventQueue, setEventQueue] = useValueRef<GameEvent[]>([])
  const [gameEvent, setGameEvent] = useValueRef<GameEvent | null>(null)

  const draw = () => {
    if (!ctx) return
    ctx.clearRect(0, 0, a.current, a.current * HEIGHT_RATE)
    const chocoPointList = calcChocoPoint(chocoList.current)
    const catchingList = calcCatchingList(
      chocoList.current,
      chocoPointList,
      isLeft.current,
      isRight.current
    )
    drawMoa(ctx, isLeft.current, isRight.current, a.current)
    drawChocoList(ctx, a.current, chocoPointList)
    drawCount(ctx, a.current, count.current)
    updateScore(catchingList)
    updateChocoList(chocoPointList, catchingList)
    handleEvent()
  }

  const handleEvent = () => {
    // 開始処理
    const currentQueue = eventQueue.current
    const currentEvent = gameEvent.current
    if (!currentEvent) {
      setGameEvent(currentQueue[0])
      setEventQueue((queue) => queue.filter((_, index) => index !== 0))
      return
    }

    // 終了処理
    if (currentEvent.id === 'FINISH' && currentEvent.frameLength === 0)
      setViewState('Result')

    if (currentEvent.frameLength === 0) {
      if (!currentQueue.length) return
      const nextEvent = currentQueue[0]
      setGameEvent(nextEvent)
      setEventQueue((queue) => queue.filter((_, index) => index !== 0))
      switch (nextEvent.id) {
        case 'START':
          return handleStartEvent()
        case 'FINISH':
          return handleFinishEvent()
        case 'CHOCO':
          return handleChocoEvent(nextEvent.choco)
        case 'INTERVAL':
          return handleIntervalEvent()
        default:
      }
    } else {
      setGameEvent((event) => {
        if (!event) return event
        return { ...event, frameLength: event.frameLength - 1 }
      })
    }
  }

  const handleStartEvent = () => {
    console.info('start')
  }

  const handleFinishEvent = () => {
    console.info('finish')
  }

  const handleChocoEvent = (choco: Choco | undefined) => {
    if (!choco) return
    setChocoList((currentList) => [...currentList, choco])
    if (choco.isChoco) setCount((currentCount) => currentCount + 1)
  }

  const handleIntervalEvent = () => {
    console.info('interval')
  }

  const updateScore = (catchingList: boolean[]) => {
    const d = catchingList.reduce((acc, b, index) => {
      if (!b) return acc
      return chocoList.current[index].isChoco ? 1 : -3
    }, 0)
    setScore((currentScore) => Math.max(currentScore + d, 0))
  }

  const updateChocoList = (
    chocoPointList: ChocoPoint[],
    catchingList: boolean[]
  ) =>
    setChocoList((chocoList) =>
      chocoList
        .map((choco) => {
          return { ...choco, frame: choco.frame + 1 }
        })
        .filter(
          (_, index) =>
            chocoPointList[index].ny <= 100 * HEIGHT_RATE &&
            !catchingList[index]
        )
    )

  const init = (canvas: HTMLCanvasElement) => {
    const parent = canvas.parentNode
    canvas.width = (parent as HTMLBaseElement).clientWidth
    canvas.height = canvas.width * HEIGHT_RATE
    const context = canvas.getContext('2d')
    if (!context) return
    setCtx(context)
    setA(canvas.width)
  }

  // created相当
  useEffect(() => {
    if (!ctx) return
    setEventQueue(makeEventQueue())
    const interval = setInterval(draw, 30)
    return () => clearInterval(interval)
  }, [ctx])

  const onMouse = (direction: 'left' | 'right', isDown: boolean) => {
    if (direction === 'left') setIsLeft(isDown)
    else setIsRight(isDown)
  }

  return [init, onMouse]
}

export default useGame
