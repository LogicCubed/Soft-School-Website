import * as Phaser from 'phaser'
import OutsideSchool from '../scenes/outsideschool'
import Hallway1 from '../scenes/hallway1'
import Classroom1 from '../scenes/classroom1'
import UIScene from '../scenes/uiscene'
import BootScene from '../scenes/bootscene'
import Classroom2 from '../scenes/classroom2'
import Playground from '../scenes/playground'

export function createGame(parent: string) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent,
    backgroundColor: '#000000',

    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 1920,
      height: 1080
    },

    scene: [BootScene, UIScene, OutsideSchool, Hallway1, Classroom1, Classroom2, Playground],
  })
}