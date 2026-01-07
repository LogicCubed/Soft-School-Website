import * as Phaser from 'phaser'
import UIScene from '../scenes/uiscene'

export function ArrowButton(
  scene: Phaser.Scene,
  x: number,
  y: number,
  angle: number = 0,
  uiScene: UIScene,
  targetSceneKey: string
) {
  const button = scene.add
    .image(x, y, 'arrowButton')
    .setAngle(angle)
    .setScale(0.075)
    .setInteractive({ useHandCursor: true })

  button.on('pointerdown', () => {
    uiScene.playClick()
    scene.scene.start(targetSceneKey)
  })

  button.on('pointerover', () => {
    scene.tweens.add({
      targets: button,
      scale: 0.08,
      duration: 100,
    })
  })

  button.on('pointerout', () => {
    scene.tweens.add({
      targets: button,
      scale: 0.075,
      duration: 100,
    })
  })

  return button
}