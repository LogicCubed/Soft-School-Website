import * as Phaser from 'phaser'

export default class Hallway1 extends Phaser.Scene {
  constructor() {
    super('hallway1')
  }

  preload() {
    this.load.image('hallway1', '/game/gameA/assets/backgrounds/hallway1.png')
  }

  create() {
    const bg = this.add.image(this.scale.width/2, this.scale.height/2, 'hallway1')
    bg.setDisplaySize(this.scale.width, this.scale.height)

    const backToOutside = this.add.circle(960, 1008, 54, 0xffffff)
    backToOutside.setInteractive({ useHandCursor: true })
    backToOutside.on('pointerdown', () => {
      this.scene.start('school-front')
    })

    const toClassroom1 = this.add.circle(1480, 450, 54, 0xffffff)
    toClassroom1.setInteractive({ useHandCursor: true })
    toClassroom1.on('pointerdown', () => {
      this.scene.start('classroom1')
    })
  }
}