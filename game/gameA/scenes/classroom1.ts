import * as Phaser from 'phaser'

export default class Classroom1 extends Phaser.Scene {
  constructor() {
    super('classroom1')
  }

  create() {
    this.add
      .text(960, 360, 'Classroom 1', {
        color: '#ffffff',
        fontSize: '58px',
      })
      .setOrigin(0.5)

    const exit = this.add.circle(120, 450, 54, 0xffffff)
    exit.setInteractive({ useHandCursor: true })
    exit.on('pointerdown', () => {
      this.scene.start('hallway1')
    })
  }
}