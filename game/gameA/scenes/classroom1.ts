import * as Phaser from 'phaser'
import UIScene from './uiscene'
import { ArrowButton } from '../core/utils'

export default class Classroom1 extends Phaser.Scene {
  constructor() {
    super('classroom1')
  }

  preload() {
    this.load.image('classroom1', '/game/gameA/assets/backgrounds/classroom1.png')
  }

  create() {
    const bg = this.add.image(this.scale.width/2, this.scale.height/2, 'classroom1')
        bg.setDisplaySize(this.scale.width, this.scale.height)
    
    const uiScene = this.scene.get('ui') as UIScene

    ArrowButton(this, 500, 400, 180, uiScene, 'hallway1')
  }
}