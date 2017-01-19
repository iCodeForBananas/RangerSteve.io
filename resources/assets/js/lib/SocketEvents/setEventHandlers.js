import GameConsts from 'lib/GameConsts'
import { NetworkStats, formatByteSize, sizeOf } from 'lib/helpers'
import onSocketConnected from './onSocketConnected'
import onSocketDisconnect from './onSocketDisconnect'
import onBulletFired from './onBulletFired'
import onPlayerDamaged from './onPlayerDamaged'
import onPlayerRespawn from './onPlayerRespawn'
import onPlayerHealthUpdate from './onPlayerHealthUpdate'
import onMessageReceived from './onMessageReceived'
import onPlayerKillLog from './onPlayerKillLog'
import onLoadGame from './onLoadGame'
import onAnnouncement from './onAnnouncement'
import onPlayerScores from './onPlayerScores'
import onGameLoop from './onGameLoop'
import Client from '../Client'
import storage from 'store'

const events = {
  [GameConsts.EVENT.LOAD_GAME]: onLoadGame,
  [GameConsts.EVENT.PLAYER_RESPAWN]: onPlayerRespawn,
  [GameConsts.EVENT.PLAYER_DAMAGED]: onPlayerDamaged,
  [GameConsts.EVENT.PLAYER_HEALTH_UPDATE]: onPlayerHealthUpdate,
  [GameConsts.EVENT.PLAYER_KILL_LOG]: onPlayerKillLog,
  [GameConsts.EVENT.MESSAGE_RECEIVED]: onMessageReceived,
  [GameConsts.EVENT.GAME_LOOP]: onGameLoop,
  [GameConsts.EVENT.BULLET_FIRED]: onBulletFired,
  [GameConsts.EVENT.ANNOUNCEMENT]: onAnnouncement,
  [GameConsts.EVENT.PLAYER_SCORES]: onPlayerScores
}

let dataReceived = 0

export default function () {
  window.socket.on('data', (data) => {
    dataReceived += sizeOf(data)
    // console.log('* LOG * data', data.type, data.payload)
    if (!data || data.type === undefined) return

    if (!events[data.type]) return

    events[data.type].call(this, data.payload)
  })

  window.socket.on('open', onSocketConnected.bind(this))
  window.socket.on('end', onSocketDisconnect.bind(this))

  if (storage.get('isNetworkStatsVisible', false)) {
    NetworkStats.loop(() => {
      const dataSent = Client.getStats().dataSent
      const data = NetworkStats.getDataPerSecond(dataSent, dataReceived)

      window.RS.networkStats = {
        dataSent: formatByteSize(dataSent),
        dataReceived: formatByteSize(dataReceived),
        dataSentPerSecond: formatByteSize(data.dataSentPerSecond),
        dataReceivedPerSecond: formatByteSize(data.dataReceivedPerSecond)
      }
    })
  }
}
