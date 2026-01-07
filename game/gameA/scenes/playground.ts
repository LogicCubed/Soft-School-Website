import * as Phaser from 'phaser'
import UIScene from './uiscene'
import { ArrowButton } from '../core/utils'

export default class Playground extends Phaser.Scene {
  constructor() {
    super('playground')
  }

  create() {
    this.add
      .text(960, 360, 'Playground', {
        color: '#ffffff',
        fontSize: '58px',
      })
      .setOrigin(0.5)
    
    const uiScene = this.scene.get('ui') as UIScene

    ArrowButton(this, 960, 1008, 90, uiScene, 'hallway1')
  }
}