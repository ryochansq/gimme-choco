/// <reference types="react-scripts" />

type ViewState = 'Top' | 'Game' | 'Result'

type Props = {
  setViewState: React.Dispatch<React.SetStateAction<ViewState>>
}

type GameProps = Props & {
  score: number
  setScore: React.Dispatch<React.SetStateAction<number>>
}
