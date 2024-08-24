import GameConsts from './GameConsts'
import Client from './Client'

export default function (data) {
  Client.send(GameConsts.EVENT.MESSAGE_SEND, data)
}
