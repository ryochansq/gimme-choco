/// <reference types="react-scripts" />

type ViewState = 'Top' | 'Game' | 'Result' | ''

type CommonProps = {
  setViewState: React.Dispatch<React.SetStateAction<ViewState>>
}

type GameProps = CommonProps & {
  score?: number
  setScore: React.Dispatch<React.SetStateAction<number>>
}

type Lane = 0 | 1 | 2

type Choco = {
  isChoco: boolean
  type: 0 | 1 | 2
  lane: Lane
  frame: number
}

type ChocoPoint = {
  isChoco: boolean
  type: 0 | 1 | 2
  nx: number
  ny: number
}

type GameEvent = {
  id: 'READY' | 'START' | 'CHOCO' | 'INTERVAL' | 'FINISH'
  frameLength: number
  choco?: Choco
}

type MoaStatus = {
  id: 'CATCH' | 'DAMAGE'
  frameLength: number
}

type MoaTransition = {
  from: Lane
  to: Lane
  frameLength: number
}
