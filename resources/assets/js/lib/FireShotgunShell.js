import Guid from './Guid'
import emitBulletFired from './SocketEvents/emitBulletFired'
import GameConsts from './GameConsts'
import actions from '../actions'

const rangeOfVariance = _.range(-.12, .12, .01)
let muzzleFlashHandler = null
let nextFire = null

export default function FireShotgunShell(currentWeaponId) {
    const store = this.game.store
    const state = store.getState()
    const currentWeapon = GameConsts.WEAPONS[currentWeaponId]
    const isPrimarySelected = store.getState().player.currentWeapon === 'primaryWeapon'

    if (
        ! state.room.id ||
        state.player.health <= 0 ||
        state.room.state !== 'active' ||
        this.game.time.time < nextFire ||
        this.bullets.countDead() <= 0
    ) return

    if (this.game.time.time < nextFire || this.bullets.countDead() <= 0)
        return

    nextFire = this.game.time.time + currentWeapon.fireRate

    let x = this.player.x
    let y = this.player.y - 10

    let pointerAngle = null
    for (var i = 0; i < 4; i++) {
        let bullet = this.bullets.getFirstDead()
        bullet.bulletId = Guid()
        bullet.damage = currentWeapon.damage
        bullet.weaponId = currentWeaponId
        bullet.alpha = 0
        bullet.height = 2
        bullet.width = 40
        bullet.reset(x, y)

        let socketPointerAngle = null
        if (pointerAngle === null) {
            pointerAngle = this.game.physics.arcade.moveToPointer(bullet, currentWeapon.bulletSpeed)
            bullet.rotation = pointerAngle
            socketPointerAngle = pointerAngle
        } else {
            let randomPointerAngle = _.sample(rangeOfVariance) + pointerAngle
            let newVelocity = this.game.physics.arcade.velocityFromRotation(randomPointerAngle, currentWeapon.bulletSpeed)
            bullet.body.velocity.x += newVelocity.x
            bullet.body.velocity.y += newVelocity.y
            bullet.rotation = randomPointerAngle
            socketPointerAngle = randomPointerAngle
        }

        // Shows the bullet after it has left the barrel so you don't have to line up the bullet with the barrel.
        setTimeout(function() {
            bullet.alpha = 1
        }, 40)

        emitBulletFired.call(this, {
            roomId: state.room.id,
            bulletId: bullet.bulletId,
            playerId: window.SOCKET_ID,
            weaponId: currentWeaponId,
            x,
            y,
            pointerAngle: socketPointerAngle,
            bulletSpeed: currentWeapon.bulletSpeed,
            damage: currentWeapon.damage
        })
    }

    // Show the muzzle flash for a short period of time and hide it unless the user is holding down fire.
    this.rightArmSprite.animations.frame = GameConsts.WEAPONS[currentWeaponId].shootingFrame
    clearTimeout(muzzleFlashHandler)
    muzzleFlashHandler = setTimeout(() => {
        this.rightArmSprite.animations.frame = GameConsts.WEAPONS[currentWeaponId].frame
    }, 60)

    // Shake camera for gun recoil
    this.camera.shake(0.0015, 100, true)

    this.weaponSoundEffects[currentWeaponId].volume = state.game.sfxVolume
    this.weaponSoundEffects[currentWeaponId].play()

    if (isPrimarySelected) {
        store.dispatch(actions.player.decrementPrimaryAmmoRemaining())
    } else {
        store.dispatch(actions.player.decrementSecondaryAmmoRemaining())
    }

    // Get ammo remaining in current gun
    const currentAmmoRemaining = isPrimarySelected
        ? store.getState().player.primaryAmmoRemaining
        : store.getState().player.secondaryAmmoRemaining

    if (
        currentAmmoRemaining <= 0 &&
        (
            (isPrimarySelected && ! store.getState().player.isPrimaryReloading) ||
            (! isPrimarySelected && ! store.getState().player.isSecondaryReloading)
        )
    ) {
        // If empty set current gun to reloading
        if (isPrimarySelected) {
            store.dispatch(actions.player.setPrimaryIsReloading(true))
        } else {
            store.dispatch(actions.player.setSecondaryIsReloading(true))
        }

        // Get reload time in seconds
        setTimeout(() => {
            if (isPrimarySelected) {
                store.dispatch(actions.player.setPrimaryIsReloading(false))
                store.dispatch(actions.player.setPrimaryAmmoRemaining(currentWeapon.ammo))
                return
            }

            store.dispatch(actions.player.setSecondaryIsReloading(false))
            store.dispatch(actions.player.setSecondaryAmmoRemaining(currentWeapon.ammo))
        }, currentWeapon.reloadTime)
        return
    }
}
