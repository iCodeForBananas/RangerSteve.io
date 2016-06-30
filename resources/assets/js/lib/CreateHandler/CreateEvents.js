import actions from '../../actions'
import GameConsts from '../GameConsts'

let lastSwitchWeaponKey = null

export default function() {
    const store = this.game.store

    // Open settings modal
    this.input.keyboard.addKey(Phaser.Keyboard.TAB).onDown.add(() => {
        store.dispatch(actions.game.openSettingsModal())
    })

    this.input.keyboard.addKey(store.getState().game.keyboardControls.reload).onUp.add(() => {
        store.dispatch(actions.player.setIsReloading(true))

        const reloadTime = store.getState().player.currentWeapon === 'primaryWeapon'
            ? GameConsts.PRIMARY_WEAPONS[store.getState().player.selectedPrimaryWeaponId].reloadTime
            : GameConsts.SECONDARY_WEAPONS[store.getState().player.selectedSecondaryWeaponId].reloadTime

        setTimeout(() => {
            store.dispatch(actions.player.setIsReloading(false))
            if (store.getState().player.currentWeapon === 'primaryWeapon') {
                store.dispatch(actions.player.setAmmoRemaining(GameConsts.PRIMARY_WEAPONS[store.getState().player.selectedPrimaryWeaponId].ammo))
                return
            }

            store.dispatch(actions.player.setAmmoRemaining(GameConsts.SECONDARY_WEAPONS[store.getState().player.selectedSecondaryWeaponId].ammo))
        }, reloadTime)
    })

    // Switch weapons
    this.input.keyboard.removeKey(lastSwitchWeaponKey)
    lastSwitchWeaponKey = store.getState().game.keyboardControls.switchWeapon
    this.input.keyboard.addKey(store.getState().game.keyboardControls.switchWeapon).onUp.add(() => {
        const currentWeapon = store.getState().player.currentWeapon

        if (currentWeapon === 'primaryWeapon') {
            store.dispatch(actions.player.setCurrentWeapon('secondaryWeapon'))
        } else {
            store.dispatch(actions.player.setCurrentWeapon('primaryWeapon'))
        }

        const newCurrentWeapon = store.getState().player.currentWeapon

        this.currentWeaponSprite.loadTexture(store.getState().player[newCurrentWeapon].meta.id)
        this.currentWeaponSprite.scale.setTo(store.getState().player[newCurrentWeapon].meta.scale)
        this.currentWeaponSprite.rotation = store.getState().player[newCurrentWeapon].meta.rotation

        if (store.getState().player.facing === 'left') {
            this.currentWeaponSprite.x = store.getState().player[newCurrentWeapon].meta.leftFaceX
            this.currentWeaponSprite.y = store.getState().player[newCurrentWeapon].meta.leftFaceY
            this.currentWeaponSprite.scale.y *= -1
        } else {
            this.currentWeaponSprite.x = store.getState().player[newCurrentWeapon].meta.rightFaceX
            this.currentWeaponSprite.y = store.getState().player[newCurrentWeapon].meta.rightFaceY
        }

        this.muzzleFlash.x = store.getState().player[newCurrentWeapon].meta.muzzleFlashX
        this.muzzleFlash.y = store.getState().player[newCurrentWeapon].meta.muzzleFlashY

        if (newCurrentWeapon === 'primaryWeapon') {
            store.dispatch(actions.player.setAmmoRemaining(GameConsts.PRIMARY_WEAPONS[store.getState().player[newCurrentWeapon].meta.id].ammo))
            return
        }

        store.dispatch(actions.player.setAmmoRemaining(GameConsts.SECONDARY_WEAPONS[store.getState().player[newCurrentWeapon].meta.id].ammo))
    })
}
