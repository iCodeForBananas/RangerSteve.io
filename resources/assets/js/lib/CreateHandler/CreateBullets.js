import GameConsts from 'lib/GameConsts'

export default function () {
  window.RS.rpgExplosions = this.game.add.group()
  window.RS.rpgExplosions.createMultiple(7, 'rpgExplosion')
  window.RS.rpgExplosions.forEach(rpgExplosion => rpgExplosion.animations.add('collision'))

  window.RS.ricochets = this.game.add.group()
  window.RS.ricochets.createMultiple(150, 'ricochet')
  window.RS.ricochets.forEach(ricochet => ricochet.animations.add('collision'))

  window.RS.bloodSprays = this.game.add.group()
  window.RS.bloodSprays.createMultiple(20, 'blood')
  window.RS.bloodSprays.forEach(bloodSpray => bloodSpray.animations.add('spray'))

  window.RS.playerDeaths = this.game.add.group()
  window.RS.playerDeaths.createMultiple(8, 'player-death')
  window.RS.playerDeaths.forEach(playerDeath => playerDeath.animations.add('death'))

  window.RS.bullets = this.game.add.group()
  window.RS.bullets.createMultiple(50, 'bullet')
  window.RS.bullets.setAll('checkWorldBounds', true)
  window.RS.bullets.setAll('outOfBoundsKill', true)

  window.RS.bullets.forEach(function (bullet) {
    bullet.height = 2
    bullet.width = 40
    this.game.arcadePolygons.enableSpriteBody(bullet, this)
    bullet.body.height = 15
    bullet.body.width = 15
    bullet.body.drag.x = 0
    bullet.body.drag.y = 0
    bullet.body.bounce.x = 0
    bullet.body.bounce.y = 0
    bullet.body.gravity.y = GameConsts.BULLET_GRAVITY
  }, this)

  window.RS.enemyBullets = this.game.add.group()
  window.RS.enemyBullets.enableBody = true
  window.RS.enemyBullets.createMultiple(350, 'bullet')
  window.RS.enemyBullets.setAll('checkWorldBounds', true)
  window.RS.enemyBullets.setAll('outOfBoundsKill', true)

  window.RS.enemyBullets.forEach(function (bullet) {
    bullet.height = 2
    bullet.width = 40
    this.game.arcadePolygons.enableSpriteBody(bullet, this)
    bullet.body.height = 15
    bullet.body.width = 15
  }, this)
}
