import GameConsts from 'lib/GameConsts'
import KillCurrentPlayer from '../KillCurrentPlayer.js'
import CreateSpawnPointVisuals from '../CreateSpawnPointVisuals'

const WORLD_WIDTH = 6000
const WORLD_HEIGHT = 2975

export function preload () {
  this.game.load.image('background', '/maps/high-rule-jungle/background.jpg', true)
  this.game.load.image('bridge', '/maps/high-rule-jungle/bridge.png', true)
  this.game.load.image('tower-rail', '/maps/high-rule-jungle/tower-rail.png', true)
  this.game.load.tilemap('tilemap', '/maps/high-rule-jungle/high-rule-jungle.json', null, window.Phaser.Tilemap.TILED_JSON)
  this.game.load.spritesheet('ninja-tiles24', '/images/ninja-tiles24.png', 24, 24)
}

export function createOverlays () {
  window.RS.bridge = this.game.add.sprite(1313, 1240, 'bridge')
  window.RS.towerRail = this.game.add.sprite(4230, 1140, 'tower-rail')
}

export function create () {
  this.game.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT)
  let background = this.game.add.tileSprite(0, 0, WORLD_WIDTH, WORLD_HEIGHT, 'background')
  // FireFox allows a max width of 4000px for this image
  background.scale.setTo(1.5)

  window.RS.groundSprite = this.game.add.sprite(0, WORLD_HEIGHT - 10, 'ground')
  window.RS.groundSprite.alpha = 0
  window.RS.groundSprite.width = WORLD_WIDTH
  window.RS.groundSprite.height = 10
  this.game.physics.arcade.enable(window.RS.groundSprite)
  window.RS.groundSprite.body.immovable = true
  window.RS.groundSprite.body.allowGravity = false

  if (GameConsts.DEBUG) CreateSpawnPointVisuals.call(this, GameConsts.MAP_SPAWN_POINTS.HighRuleJungle)
}

export function update () {
  this.game.physics.arcade.overlap(window.RS.player, window.RS.groundSprite, () => {
    KillCurrentPlayer.call(this)
  })
}
