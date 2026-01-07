import * as Phaser from 'phaser'

export default class UIScene extends Phaser.Scene {
  clickSound!: Phaser.Sound.BaseSound

  constructor() {
    super('ui')
  }

  create() {
    this.clickSound = this.sound.add('click')

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

  playClick() {
      this.clickSound.play({ volume: 0.5 })
  }
}