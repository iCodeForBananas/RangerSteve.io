'use strict'

module.exports = function() {
    this.game.renderer.renderSession.roundPixels = true
    this.game.stage.disableVisibilityChange = true
    this.physics.startSystem(Phaser.Physics.ARCADE)
}
