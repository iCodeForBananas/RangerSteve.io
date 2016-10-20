import emitPlayerDamaged from './SocketEvents/emitPlayerDamaged'
import actions from '../actions'

export default function() {
    const store = this.game.store

    this.game.input.enabled = false
    this.game.input.reset()
    RangerSteve.player.body.acceleration.x = 0
    RangerSteve.player.body.acceleration.y = 0
    RangerSteve.player.body.velocity.x = 0
    RangerSteve.player.body.velocity.y = 0
    store.dispatch(actions.player.setHealth(0))

    RangerSteve.player.visible = false

    emitPlayerDamaged.call(this, {
        roomId: store.getState().room.id,
        damage: 100,
        damagedPlayerId: window.SOCKET_ID,
        attackingPlayerId: null
    })
}