import * as Phaser from 'phaser'
import UIScene from './uiscene'
import { ArrowButton } from '../core/utils'

export default class OutsideSchool extends Phaser.Scene {
  constructor() {
    super('school-front')
  }

  preload() {
      this.load.image('school_front', '/game/gameA/assets/backgrounds/school_front.png')
  }

  create() {
    const bg = this.add.image(this.scale.width/2, this.scale.height/2, 'school_front')
            bg.setDisplaySize(this.scale.width, this.scale.height)

    const uiScene = this.scene.get('ui') as UIScene

    ArrowButton(this, 960, 680, -90, uiScene, 'hallway1')

  }
}