import * as Phaser from 'phaser'
import UIScene from './uiscene'
import { ArrowButton } from '../core/utils'

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

    const uiScene = this.scene.get('ui') as UIScene

    ArrowButton(this, 960, 1008, 90, uiScene, 'school-front')

    ArrowButton(this, 960, 450, -90, uiScene, 'playground')

    ArrowButton(this, 1480, 450, 0, uiScene, 'classroom1')

    ArrowButton(this, 440, 450, 180, uiScene, 'classroom2')

  }
}