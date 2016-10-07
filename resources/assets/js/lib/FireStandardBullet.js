import Guid from './Guid'
import emitBulletFired from './SocketEvents/emitBulletFired'
import GameConsts from './GameConsts'
import actions from '../actions'

let muzzleFlashHandler = null
let nextFire = null

export default function FireStandardBullet(currentWeaponId) {
    const store = this.game.store
    const state = store.getState()
    const currentWeapon = GameConsts.WEAPONS[currentWeaponId]
    const isPrimarySelected = store.getState().player.currentWeapon === 'primaryWeapon'

    if (this.game.time.time < nextFire || this.bullets.countDead() <= 0)
        return

    nextFire = this.game.time.time + currentWeapon.fireRate

    let x = this.player.x
    let y = this.player.y - 10

    let bullet = this.bullets.getFirstDead()
    bullet.bulletId = Guid()
    bullet.damage = currentWeapon.damage
    bullet.weaponId = currentWeaponId
    bullet.alpha = 0
    bullet.height = 3
    bullet.width = 20
    bullet.reset(x, y)
    let pointerAngle = this.game.physics.arcade.moveToPointer(bullet, currentWeapon.bulletSpeed)
    bullet.rotation = pointerAngle

    // Show the muzzle flash for a short period of time and hide it unless the user is holding down fire.
    this.rightArmSprite.animations.frame = GameConsts.WEAPONS[currentWeaponId].shootingFrame
    clearTimeout(muzzleFlashHandler)
    muzzleFlashHandler = setTimeout(() => {
        this.rightArmSprite.animations.frame = GameConsts.WEAPONS[currentWeaponId].frame
    }, 60)

    // Shake camera for gun recoil
    this.camera.shake(0.0015, 100, true)

    // Shows the bullet after it has left the barrel so you don't have to line up the bullet with the barrel.
    setTimeout(() => {
        bullet.alpha = this.bulletAlpha !== undefined ? this.bulletAlpha : 1
    }, 40)

    this.weaponSoundEffects[currentWeaponId].volume = state.game.sfxVolume
    this.weaponSoundEffects[currentWeaponId].play()

    if (isPrimarySelected) {
        store.dispatch(actions.player.decrementPrimaryAmmoRemaining())
    } else {
        store.dispatch(actions.player.decrementSecondaryAmmoRemaining())
    }

    emitBulletFired.call(this, {
        roomId: state.room.id,
        bulletId: bullet.bulletId,
        playerId: '/#' + window.socket.id,
        weaponId: currentWeaponId,
        x,
        y,
        pointerAngle,
        bulletSpeed: currentWeapon.bulletSpeed,
        damage: currentWeapon.damage
    })

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
