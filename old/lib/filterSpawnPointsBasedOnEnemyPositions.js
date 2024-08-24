const _ = require('lodash')

const GameConsts = require('./GameConsts')

function distanceBetweenTwoPoints (x1, y1, x2, y2) {
  var a = x1 - x2
  var b = y1 - y2

  return Math.sqrt(a * a + b * b)
}

module.exports = function (spawnPoints, players) {
  const possibleSpawnPoints = _.clone(spawnPoints)

  Object.keys(players).forEach(playerId => {
    const player = players[playerId]
    _.remove(possibleSpawnPoints, function (possibleSpawnPoint) {
      const distanceBetweenEnemyAndSpawnPoint = distanceBetweenTwoPoints(
        player.x, player.y,
        possibleSpawnPoint.x, possibleSpawnPoint.y
      )

      return distanceBetweenEnemyAndSpawnPoint < GameConsts.SPAWN_POINT_DISTANCE_FROM_ENEMY
    })
  })

  return possibleSpawnPoints
}
