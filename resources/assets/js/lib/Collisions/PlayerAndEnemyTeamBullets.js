import PlayBloodSpray from '../PlayBloodSpray'
import PlayRocketExplosion from '../PlayRocketExplosion'

export default function () {
  const state = this.game.store.getState()

    // Did enemy bullets hit you
  this.game.physics.arcade.collide(window.RS.player, window.RS.enemyBullets, function (player, bullet) {
    const enemy = state.room.players[bullet.data.playerId]

    if (
      !bullet.weaponId ||
      !window.SOCKET_ID ||
      state.player.health <= 0 ||
      !enemy ||
      enemy.team === window.RS.player.data.team ||
      window.RS.player.data.isProtected
    ) return

    bullet.kill()

    PlayBloodSpray.call(this, {
      bulletY: bullet.y,
      bulletX: bullet.x,
      playerX: player.x,
      bulletRotation: bullet.rotation
    })

    if (bullet.weaponId === 'RPG') {
      PlayRocketExplosion.call(this, {
        bulletY: bullet.y,
        bulletX: bullet.x
      })
    }
  }, null, this)
}
