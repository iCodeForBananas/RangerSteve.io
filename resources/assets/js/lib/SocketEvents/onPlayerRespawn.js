import actions from 'actions'
import GameConsts from 'lib/GameConsts'

export default function onPlayerRespawn (data) {
  const store = this.game.store

  if (this.game.state.current === 'Boot') return

  resetPlayerMovement.call(this)
  resetPlayerWeapons.call(this)

  // Enables player to give input to the game now
  this.game.input.enabled = true
  this.game.input.reset()

  store.dispatch(actions.player.setPlayer({ health: GameConsts.PLAYER_FULL_HEALTH }))

  window.RS.player.x = data.x
  window.RS.player.y = data.y
  window.RS.player.visible = true
  window.RS.player.alive = true
  window.RS.player.data.isProtected = true
}

function resetPlayerWeapons () {
  const store = this.game.store
  const state = store.getState()

  if (!state.room.mod) {
    store.dispatch(actions.player.setPrimaryWeapon(GameConsts.WEAPONS[state.player.nextSelectedPrimaryWeaponId]))
    store.dispatch(actions.player.setSelectedPrimaryWeaponId(state.player.nextSelectedPrimaryWeaponId))
    store.dispatch(actions.player.setSecondaryWeapon(GameConsts.WEAPONS[state.player.nextSelectedSecondaryWeaponId]))
    store.dispatch(actions.player.setSelectedSecondaryWeaponId(state.player.nextSelectedSecondaryWeaponId))

    // If player dies with secondary we reset player to use primary
    store.dispatch(actions.player.setCurrentWeapon('primaryWeapon'))

    // Show non firing primary weapon frame
    window.RS.player.rightArmSprite.frame = GameConsts.WEAPONS[state.player.nextSelectedPrimaryWeaponId].frame
  }

  // Reset primary weapon to defaults
  store.dispatch(actions.player.setPrimaryIsReloading(false))
  store.dispatch(actions.player.setPrimaryAmmoRemaining(GameConsts.WEAPONS[state.player.nextSelectedPrimaryWeaponId].ammo))

  // Reset secondary weapon to defaults
  store.dispatch(actions.player.setSecondaryIsReloading(false))
  store.dispatch(actions.player.setSecondaryAmmoRemaining(GameConsts.WEAPONS[state.player.nextSelectedSecondaryWeaponId].ammo))

  store.dispatch(actions.player.setIsSwitchingWeapon(false))
}

function resetPlayerMovement () {
  window.RS.player.body.acceleration.x = 0
  window.RS.player.body.acceleration.y = 0
  window.RS.player.body.velocity.x = 0
  window.RS.player.body.velocity.y = 0
}
