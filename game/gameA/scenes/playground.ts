import * as Phaser from 'phaser'
import UIScene from './uiscene'
import { ArrowButton } from '../core/utils'

export default class Playground extends Phaser.Scene {
  constructor() {
    super('playground')
  }

  preload() {
      this.load.image('playground', '/game/gameA/assets/backgrounds/playground.png')
  }

  create() {
    const bg = this.add.image(this.scale.width/2, this.scale.height/2, 'playground')
            bg.setDisplaySize(this.scale.width, this.scale.height)
    
    const uiScene = this.scene.get('ui') as UIScene

    ArrowButton(this, 960, 1008, 90, uiScene, 'hallway1')
  }
}