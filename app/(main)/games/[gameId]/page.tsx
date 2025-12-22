'use client'

import { useEffect } from 'react'
import createGame from '@/game/gameA'

export default function GamePage() {
  useEffect(() => {
    const game = createGame('game-container')
    return () => game.destroy(true)
  }, [])

  return (
    <div
      id="game-container"
        style={{
          width: '75vw',
          height: '75vh',
          margin: 0,
        }}
    />
  )
}