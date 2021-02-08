import { useEffect, useState, useRef } from 'react'

import {
  drawMoa,
  calcChocoPoint,
  drawChocoList,
  drawCount,
  calcCatchingList,
} from 'game/draw'
import { makeEventQueue, getRandomLane } from 'game/event'

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
  const [prevMoaLane, setPrevMoaLane] = useValueRef<Lane>(1)
  const [a, setA] = useValueRef(360)
  const [chocoList, setChocoList] = useValueRef<Choco[]>([])
  const [count, setCount] = useValueRef(0)
  const [eventQueue, setEventQueue] = useValueRef<GameEvent[]>([])
  const [gameEvent, setGameEvent] = useValueRef<GameEvent | null>(null)
  const [moaStatus, setMoaStatus] = useValueRef<MoaStatus | null>(null)
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
    ctx.clearRect(0, 0, a.current, a.current * HEIGHT_RATE)
    const chocoPointList = calcChocoPoint(chocoList.current)
    const catchingList = calcCatchingList(
      chocoList.current,
      chocoPointList,
      moaLane(),
      moaStatus.current
    )
    drawMoa(
      ctx,
      moaLane(),
      prevMoaLane.current,
      a.current,
      moaStatus.current,
      moaTransition.current
    )
    drawChocoList(ctx, a.current, chocoPointList)
    drawCount(ctx, a.current, count.current)
    const point = calcGettingPoint(catchingList)
    setScore((currentScore) => Math.max(currentScore + point, 0))
    updateMoaStatus(point)
    updateMoaTransition()
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
    // TODO: Startの画像を表示させる。Give me Chocolate？
  }

  const handleFinishEvent = () => {
    console.info('finish')
    // TODO: Finishの画像を表示させる
  }

  const handleChocoEvent = (choco: Choco | undefined) => {
    if (!choco) return
    const randLane = getRandomLane()
    const honeLane =
      randLane === choco.lane ? (((randLane + 1) % 3) as Lane) : randLane
    const adding = (() => {
      const c = count.current
      if (c === 0) return false
      else if (c <= 30) return c % 6 === 0
      else if (c <= 60) return c % 4 === 0
      else return c % 6 === 1 || c % 6 === 3
    })()
    if (adding)
      setChocoList((currentList) => [
        ...currentList,
        choco,
        { isChoco: false, type: 0, lane: honeLane, frame: 0 },
      ])
    else setChocoList((currentList) => [...currentList, choco])
    if (choco.isChoco) setCount((currentCount) => currentCount + 1)
  }

  const calcGettingPoint = (catchingList: boolean[]): number =>
    catchingList.reduce((acc, b, index) => {
      if (!b) return acc
      return chocoList.current[index].isChoco ? 1 : -3
    }, 0)

  const updateMoaStatus = (point: number) => {
    if (point > 0) setMoaStatus({ id: 'CATCH', frameLength: 5 })
    else if (point < 0) setMoaStatus({ id: 'DAMAGE', frameLength: 20 })
    else
      setMoaStatus((status) => {
        if (!status || status.frameLength === 0) return null
        return {
          ...status,
          frameLength: status.frameLength - 1,
        }
      })
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
    const interval = setInterval(update, 30)
    return () => clearInterval(interval)
  }, [ctx])

  const onMove = (direction: 'left' | 'right', isDown: boolean) => {
    if (direction === 'left') setIsLeft(isDown)
    else setIsRight(isDown)
  }

  return [init, onMove]
}

export default useGame
