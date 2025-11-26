'use client'

import { useEffect, use } from 'react'
import Phaser from 'phaser'

interface Props {
  params: Promise<{ gameId: string }>
}

export default function GamePage({ params }: Props) {
  const { gameId } = use(params)

  useEffect(() => {
    class MyGame extends Phaser.Scene {
      player!: Phaser.GameObjects.Rectangle
      cursors!: Phaser.Types.Input.Keyboard.CursorKeys
      wKey!: Phaser.Input.Keyboard.Key
      aKey!: Phaser.Input.Keyboard.Key
      sKey!: Phaser.Input.Keyboard.Key
      dKey!: Phaser.Input.Keyboard.Key

      constructor() {
        super('my-game-scene')
      }

      create() {
        // Create a simple white box in the center
        this.player = this.add.rectangle(400, 300, 50, 50, 0xffffff)

        // Enable keyboard input
        this.cursors = this.input.keyboard!.createCursorKeys()
        const { W, A, S, D } = Phaser.Input.Keyboard.KeyCodes
        this.wKey = this.input.keyboard!.addKey(W)
        this.aKey = this.input.keyboard!.addKey(A)
        this.sKey = this.input.keyboard!.addKey(S)
        this.dKey = this.input.keyboard!.addKey(D)
      }

      update() {
        const speed = 5

        if (this.aKey.isDown) this.player.x -= speed
        if (this.dKey.isDown) this.player.x += speed
        if (this.wKey.isDown) this.player.y -= speed
        if (this.sKey.isDown) this.player.y += speed
      }
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game-container',
      backgroundColor: '#222222',
      scene: MyGame,
    }

    const game = new Phaser.Game(config)

    return () => {
      game.destroy(true)
    }
  }, [gameId])

  return (
    <div
      id="game-container"
      style={{ width: '800px', height: '600px', margin: '0 auto' }}
    />
  )
}