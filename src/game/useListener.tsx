import React, { useEffect } from 'react'

type Props = {
  onMouse: (direction: 'left' | 'right', isDown: boolean) => void
}

export const useListener: React.FC<Props> = ({ onMouse }: Props) => {
  useEffect(() => {
    document.addEventListener('keydown', onKey, false)
    document.addEventListener('keyup', onKey, false)
    document.addEventListener('touchstart', onTouch, false)
    document.addEventListener('touchend', onTouch, false)
    return () => {
      document.removeEventListener('keydown', onKey, false)
      document.removeEventListener('keyup', onKey, false)
      document.removeEventListener('touchstart', onTouch, false)
      document.removeEventListener('touchend', onTouch, false)
    }
  }, [])

  const onKey = (event: KeyboardEvent) => {
    const isDown = event.type === 'keydown'
    if (event.key === 'Left' || event.key === 'ArrowLeft') {
      onMouse('left', isDown)
      event.preventDefault()
    } else if (event.key === 'Right' || event.key === 'ArrowRight') {
      onMouse('right', isDown)
      event.preventDefault()
    }
  }

  const onTouch = (event: TouchEvent) => {
    const isDown = event.type === 'touchstart'
    const x = event.changedTouches.item(0)?.clientX
    if (x && x <= document.body.clientWidth / 2) onMouse('left', isDown)
    else onMouse('right', isDown)
  }

  return null
}
