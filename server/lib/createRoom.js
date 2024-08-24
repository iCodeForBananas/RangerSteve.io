'use strict'

const moment = require('moment')
const _ = require('lodash')
const hri = require('human-readable-ids').hri

const GameConsts = require('./GameConsts')
const getTeam = require('./getTeam')
const getModeWithChance = require('./getModeWithChance')

module.exports = function (data) {
  let players = {}

  if (data.player) {
    // Initialize players object with a single player
    players[data.player.id] = data.player
  } else if (data.players) {
    // Add existing players to this room
    players = data.players
  }

  // Use the specified game mode if it exists
  const gamemodeId = data.gamemode && GameConsts.GAMEMODES.indexOf(data.gamemode) > -1
    ? data.gamemode
    : _.sample(GameConsts.GAMEMODES)

  const modeId = (typeof data.mode !== 'undefined') && GameConsts.MODES[data.mode]
    ? data.mode
    // : _.sample(_.keys(GameConsts.MODES))
    : getModeWithChance(_.keys(GameConsts.MODES), GameConsts.CHANCE_OF_GUN_MODE_IN_PERCENT)

  Object.keys(players).forEach(playerId => {
    players[playerId].team = (gamemodeId === 'TeamDeathmatch') ? getTeam(players, 0, 0) : null
  })

  // Use the specified map if it exists
  const mapId = data.map && GameConsts.MAPS.indexOf(data.map) > -1
    ? data.map
    : _.sample(GameConsts.MAPS)

  // Remove non alphanumeric and hyphens from custom room ids
  const cleanedRoomId = data.id
    ? data.id.replace(/[^a-zA-Z0-9 -]/g, '').substr(0, 25)
    : hri.random().replace(/[^a-zA-Z0-9 -]/g, '')

  return {
    blueTeamScore: 0,
    gamemode: gamemodeId,
    mode: modeId,
    id: cleanedRoomId,
    map: mapId,
    messages: data.messages || [],
    players: players,
    redTeamScore: 0,
    highscore: 0,
    roundEndTime: Date.now() + GameConsts.ROUND_LENGTH_IN_MS,
    state: 'active'
  }
}
