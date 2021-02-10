const PLAN_LIST = [
  [2, 0],
  [2, 0],
  [3, 1],
  [5, 1],
  [5, 0],
  [4, 2],
  [10, 2],
  [8, 1],
  [10, 2],
  [20, 3],
  [30, 5],
]

export const makeEventQueue = (): GameEvent[] => [
  ReadyEvent,
  StartEvent,
  ...makeChocoEventList(),
  FinishEvent,
]

const ReadyEvent: GameEvent = {
  id: 'READY',
  frameLength: 10,
}

const StartEvent: GameEvent = {
  id: 'START',
  frameLength: 90,
}

const FinishEvent: GameEvent = {
  id: 'FINISH',
  frameLength: 70,
}

const IntervalEvent: GameEvent = {
  id: 'INTERVAL',
  frameLength: 35,
}

const makeChocoEvent = (isChoco: boolean, lane: Lane): GameEvent => {
  return {
    id: 'CHOCO',
    frameLength: 8 + getRandomLane() * 2,
    choco: {
      isChoco,
      type: getRandomLane(),
      lane,
      frame: 0,
    },
  }
}

const makeChocoEventList = (): GameEvent[] => {
  const res: GameEvent[] = []
  // 最初の1つは真ん中のレーンにチョコが落ちる
  res.push(makeChocoEvent(true, 1))
  res.push(IntervalEvent)

  PLAN_LIST.forEach((plan) => {
    const list: GameEvent[] = []
    for (let i = 0; i < plan[0]; i++)
      list.push(makeChocoEvent(true, getRandomLane()))
    for (let i = 0; i < plan[1]; i++)
      list.push(makeChocoEvent(false, getRandomLane()))
    res.push(...shuffleList(list))
    res.push(IntervalEvent)
  })
  return res
}

export const getRandomLane = (): Lane => {
  return Math.floor(Math.random() * Math.floor(3)) as Lane
}

function shuffleList<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1))
    const tmp = array[i]
    array[i] = array[r]
    array[r] = tmp
  }
  return array
}
