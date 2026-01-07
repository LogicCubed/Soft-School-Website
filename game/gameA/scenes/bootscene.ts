import * as Phaser from 'phaser'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('boot')
  }

  preload() {
    this.load.image('arrowButton', '/game/assets/icons/arrow_button.png')
    this.load.audio('click', '/game/assets/sounds/click.wav')
  }

  create() {
    this.scene.start('school-front')
    this.scene.launch('ui')
  }
}