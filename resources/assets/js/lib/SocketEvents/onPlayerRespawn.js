// @flow
import includes from 'lodash/includes'

import Maps from '../Maps'
import PlayerById from '../PlayerById'
import actions from 'actions'
import GameConsts from 'lib/GameConsts'
import CreateKeyboardBindings from '../CreateHandler/CreateKeyboardBindings'
import GetSpawnPoint from '../GetSpawnPoint'
// import playerIdSchema from 'lib/schemas/playerIdSchema'

export default function onPlayerRespawn(data) {
    // const data = playerIdSchema.decode(buffer)
    const state = this.game.store.getState()
    const store = this.game.store
    const currentWeapon = state.player.currentWeapon

    if (includes(['Boot', 'Preloader'], this.game.state.current)) return

    if (data.id !== window.SOCKET_ID) {
        let enemyPlayer = PlayerById.call(this, data.id)
        if (! enemyPlayer) return
        enemyPlayer.data.health = GameConsts.PLAYER_FULL_HEALTH
        enemyPlayer.visible = true
        return
    }

    // Create and set the new spawn point
    const spawnPoints = Maps[state.room.map].getSpawnPoints()
    const spawnPoint = GetSpawnPoint(spawnPoints, RS.enemies.children)

    RS.player.x = spawnPoint.x
    RS.player.y = spawnPoint.y

    RS.player.body.acceleration.x = 0
    RS.player.body.acceleration.y = 0
    RS.player.body.velocity.x = 0
    RS.player.body.velocity.y = 0

    store.dispatch(actions.player.setPrimaryWeapon(GameConsts.WEAPONS[state.player.nextSelectedPrimaryWeaponId]))
    store.dispatch(actions.player.setSelectedPrimaryWeaponId(state.player.nextSelectedPrimaryWeaponId))
    store.dispatch(actions.player.setSecondaryWeapon(GameConsts.WEAPONS[state.player.nextSelectedSecondaryWeaponId]))
    store.dispatch(actions.player.setSelectedSecondaryWeaponId(state.player.nextSelectedSecondaryWeaponId))

    if (currentWeapon === 'primaryWeapon')
        RS.player.rightArmSprite.animations.frame = GameConsts.WEAPONS[state.player.nextSelectedPrimaryWeaponId].frame
    else
        RS.player.rightArmSprite.animations.frame = GameConsts.WEAPONS[state.player.nextSelectedSecondaryWeaponId].frame

    store.dispatch(actions.player.setPrimaryIsReloading(false))
    store.dispatch(actions.player.setPrimaryAmmoRemaining(GameConsts.WEAPONS[state.player.nextSelectedPrimaryWeaponId].ammo))

    store.dispatch(actions.player.setSecondaryIsReloading(false))
    store.dispatch(actions.player.setSecondaryAmmoRemaining(GameConsts.WEAPONS[state.player.nextSelectedSecondaryWeaponId].ammo))

    RS.player.visible = true
    this.game.input.enabled = true
    this.game.input.reset()
    CreateKeyboardBindings.call(this)

    // Allow Phaser to move the player
    // so that the map doesn't
    // kill them again.
    setTimeout(() => {
        store.dispatch(actions.player.setHealth(GameConsts.PLAYER_FULL_HEALTH))
    }, 100)
}
