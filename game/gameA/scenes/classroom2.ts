import * as Phaser from 'phaser'
import UIScene from './uiscene'
import { ArrowButton } from '../core/utils'

export default class Classroom2 extends Phaser.Scene {
  constructor() {
    super('classroom2')
  }

  preload() {
      this.load.image('classroom2', '/game/gameA/assets/backgrounds/classroom2.png')
  }

  create() {
    const bg = this.add.image(this.scale.width/2, this.scale.height/2, 'classroom2')
            bg.setDisplaySize(this.scale.width, this.scale.height)
    
    const uiScene = this.scene.get('ui') as UIScene

    ArrowButton(this, 1400, 400, 0, uiScene, 'hallway1')
  }
}