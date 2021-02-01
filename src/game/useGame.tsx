import React, { useState, useEffect, useRef } from 'react'

type GameProps = Props & {
  setScore: React.Dispatch<React.SetStateAction<number>>
}

const useCanvas = ({
  setViewState,
  setScore,
}: GameProps): [React.RefObject<HTMLCanvasElement>, () => void, () => void] => {
  const [time, setTime] = useState(5)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (time === 0) {
      setScore(444)
      setTimeout(() => setViewState('Result'), 1000)
    } else {
      setTimeout(() => setTime((time) => time - 1), 1000)
    }
  }, [time])

  const onClickButton = (direction: 'left' | 'right') => {
    console.info(`${direction} clicked`)
  }

  const onClickLeft = () => onClickButton('left')
  const onClickRight = () => onClickButton('right')

  return [canvasRef, onClickLeft, onClickRight]
}

export default useCanvas
