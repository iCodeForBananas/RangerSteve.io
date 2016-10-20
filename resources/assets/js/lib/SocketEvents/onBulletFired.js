import { PropTypes } from 'react'

import GameConsts from '../GameConsts'
import IsGameActive from '../IsGameActive'

const propTypes = {
    bulletId: PropTypes.string.isRequired,
    playerId: PropTypes.string.isRequired,
    damage: PropTypes.number.isRequired,
    pointerAngle: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    bulletSpeed: PropTypes.number.isRequired,
    weaponId: PropTypes.string.isRequired
}

let soundThrottle = false

export default function onBulletFired(data) {
    const store = this.game.store

    if (! IsGameActive.call(this)) return
    if (data.id === window.SOCKET_ID) return

    let bullet = RangerSteve.enemyBullets.getFirstDead()
    bullet.reset(data.x, data.y)
    bullet.bulletId = data.bulletId
    bullet.playerId = data.playerId
    bullet.damage = data.damage
    bullet.rotation = data.pointerAngle
    bullet.weaponId = data.weaponId
    bullet.body.gravity.y = GameConsts.BULLET_GRAVITY
    bullet.enableBody = true
    bullet.physicsBodyType = Phaser.Physics.ARCADE

    let newVelocity = this.game.physics.arcade.velocityFromRotation(data.pointerAngle, data.bulletSpeed)
    bullet.body.velocity.x += newVelocity.x
    bullet.body.velocity.y += newVelocity.y

    let distanceBetweenBulletAndPlayer = Phaser.Math.distance(RangerSteve.player.x, RangerSteve.player.y, data.x, data.y)
    let enemyBulletVolume = distanceBetweenBulletAndPlayer > 0 ? 1 - (distanceBetweenBulletAndPlayer / 3000) : 0

    /**
     * Sound throttle stops the four bullets
     * fired by the shotgun from being
     * played four times.
     */
    if (soundThrottle) return
    soundThrottle = true
    RangerSteve.weaponSoundEffects[bullet.weaponId].volume = store.getState().game.sfxVolume * enemyBulletVolume
    RangerSteve.weaponSoundEffects[bullet.weaponId].play()
    setTimeout(() => soundThrottle = false, 100)
}
