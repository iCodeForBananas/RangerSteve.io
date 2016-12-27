// @flow
import find from 'lodash/find'

import actions from 'actions'
import PlayKillingSpreeSound from '../PlayKillingSpreeSound'

let killConfirmedHandle = null
let lastKillingSpreeCount = 0

export default function onPlayerKillLog(data: {
    deadNickname: string,
    attackerNickname: string,
    weaponId: string,
}) {
    const store = this.game.store

    /**
     * Kill log
     */
    store.dispatch(actions.game.addKillLogMessage(data))
    setTimeout(() => {
        store.dispatch(actions.game.removeKillLogMessage(data))
    }, 10000)

    /**
     * Kill confirmed
     */
    store.dispatch(actions.player.setShowKillConfirmed(true))
    clearTimeout(killConfirmedHandle)
    killConfirmedHandle = setTimeout(() => {
        store.dispatch(actions.player.setShowKillConfirmed(false))
    }, 3000)

    // Show the killing spree hud if applicable
    store.dispatch(actions.player.setKillingSpreeCount(data.killingSpree))
    if (data.killingSpree === lastKillingSpreeCount) return
    lastKillingSpreeCount = data.killingSpree
    PlayKillingSpreeSound.call(this, data.killingSpree, store.getState().game.sfxVolume)

    // This will hide the killing spree hud
    setTimeout(() => {
        store.dispatch(actions.player.setKillingSpreeCount(0))
    }, 3000)

    // Play headshot soundeffect
    if (data.wasHeadshot) {
        RS.headshotSound.volume = store.getState().game.sfxVolume
        RS.headshotSound.play()
    }

    /**
     * Update player scores
     */
    const room = store.getState().room
    room.players.forEach(player => {
        const playerScore = find(data.playerScores, { id: player.id })
        if (! playerScore) return

        player.bestKillingSpree = playerScore.bestKillingSpree
        player.bulletsFired = playerScore.bulletsFired
        player.bulletsHit = playerScore.bulletsHit
        player.deaths = playerScore.deaths
        player.headshots = playerScore.headshots
        player.killingSpree = playerScore.killingSpree
        player.kills = playerScore.kills
        player.score = playerScore.score
        player.secondsInRound = playerScore.secondsInRound
    })

    store.dispatch(actions.room.setRoom(room))
}
