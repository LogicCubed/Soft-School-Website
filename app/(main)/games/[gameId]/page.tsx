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
      style={{
        flex: 1,               // take all remaining horizontal space beside the sidebar
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '16px',       // optional spacing around the game
        boxSizing: 'border-box',
      }}
    >
      <div
        id="game-container"
        style={{
          width: '75%',
          height: '75%',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      />
    </div>
  )
}