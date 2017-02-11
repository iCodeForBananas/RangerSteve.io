import GameConsts from 'lib/GameConsts'
import CreateSpawnPointVisuals from '../CreateSpawnPointVisuals'

const WORLD_WIDTH = 3200
const WORLD_HEIGHT = 1920

export function preload () {
  this.game.load.image('background', '/maps/eclipse/background.jpg', true)
  this.game.load.tilemap('tilemap', '/maps/eclipse/tilemap.json', null, window.Phaser.Tilemap.TILED_JSON)
  this.game.load.spritesheet('ninja-tiles32', '/images/ninja-tiles32.png', 32, 32)
}

export function create () {
  this.game.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT)
  this.game.add.tileSprite(0, 0, WORLD_WIDTH, WORLD_HEIGHT, 'background')

  if (GameConsts.DEBUG) CreateSpawnPointVisuals.call(this, GameConsts.MAP_SPAWN_POINTS.Eclipse)
}
