import * as Phaser from 'phaser'

export default class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ui', active: true })
  }

  create() {
    const margin = 50
    const radius = 36

    const fullscreenButton = this.add.circle(
      this.scale.width - margin,
      margin,
      radius,
      0xffffff
    )
    fullscreenButton.setInteractive({ useHandCursor: true })

    fullscreenButton.on('pointerdown', () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen()
      } else {
        this.scale.startFullscreen()
      }
    })
  }
}