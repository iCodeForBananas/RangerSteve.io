const schemapack = require('schemapack')

module.exports = schemapack.build({
  angle: 'int16',
  flying: 'bool',
  shooting: 'bool',
  weaponId: 'string',
  x: 'uint16',
  y: 'uint16',
  velocityX: 'int16',
  velocityY: 'int16'
}, false)
