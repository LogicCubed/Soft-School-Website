import * as Phaser from 'phaser'

export default class OutsideSchool extends Phaser.Scene {
  constructor() {
    super('school-front')
  }

  create() {
    this.add
      .text(960, 900, 'Outside', {
        color: '#ffffff',
        fontSize: '58px',
      })
      .setOrigin(0.5)

    const door = this.add.circle(960, 540, 54, 0xffffff)
    door.setInteractive({ useHandCursor: true })
    door.on('pointerdown', () => {
      this.scene.start('hallway1')
    })
    
  }
}