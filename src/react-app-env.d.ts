/// <reference types="react-scripts" />

type ViewState = 'Top' | 'Game' | 'Result'

type Props = {
  setViewState: React.Dispatch<React.SetStateAction<ViewState>>
}

type GameProps = Props & {
  score?: number
  setScore: React.Dispatch<React.SetStateAction<number>>
}

type Lane = 0 | 1 | 2

type Choco = {
  isChoco: boolean
  lane: Lane
  frame: number
}

type ChocoPoint = {
  isChoco: boolean
  nx: number
  ny: number
}

type GameEvent = {
  id: 'READY' | 'START' | 'CHOCO' | 'INTERVAL' | 'FINISH'
  frameLength: number
  choco?: Choco
}

type MoaStatus = {
  id: '' | 'CATCH' | 'DAMAGE'
  frameLength: number
}

type MoaPosition = {
  id: '' | 'LEFT' | 'RIGHT'
  frameLength: number
}
