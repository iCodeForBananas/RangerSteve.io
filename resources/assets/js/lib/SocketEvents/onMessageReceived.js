import { PropTypes } from 'react'

import actions from '../../actions'

const propTypes = {
    roomId: PropTypes.string.isRequired,
    playerNickname: PropTypes.string.isRequired,
    playerId: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
}

export default function onBulletFired(data) {
    const store = this.game.store
    if (store.getState().game.state !== 'active') return

    this.game.store.dispatch(actions.game.addChatMessage(data))
}
