import GameConsts from 'lib/GameConsts'
import { isJumpJetInputActive } from './InputHelpers'
import updatePlayerAngles from './updatePlayerAngles'

function isRunningLeftAndFacingLeft(isMovingLeft, isMovingRight, mouseX, playerX) {
    return isMovingLeft && ! isMovingRight && mouseX < playerX
}

function isRunningLeftAndFacingRight(isMovingLeft, isMovingRight, mouseX, playerX) {
    return isMovingLeft && ! isMovingRight && mouseX > playerX
}

function isRunningRightAndFacingLeft(isMovingLeft, isMovingRight, mouseX, playerX) {
    return ! isMovingLeft && isMovingRight && mouseX < playerX
}

function isRunningRightAndFacingRight(isMovingLeft, isMovingRight, mouseX, playerX) {
    return ! isMovingLeft && isMovingRight && mouseX > playerX
}

function isNotMoving(isMovingLeft, isMovingRight) {
    return ! isMovingLeft && ! isMovingRight
}

export default function PlayerMovementHandler() {
    const state = this.game.store.getState()
    const isMovingLeft = this.game.input.keyboard.isDown(state.game.keyboardControls.left)
    const isMovingRight = this.game.input.keyboard.isDown(state.game.keyboardControls.right)
    const angle = (this.game.physics.arcade.angleToPointer(RS.player) * 180 / Math.PI) + 90

    if (state.player.health <= 0) return

    updatePlayerAngles(RS.player, angle)

    if (isRunningLeftAndFacingLeft(isMovingLeft, isMovingRight, this.game.input.worldX, RS.player.x)) {
        RS.player.playerSprite.animations.play('runLeft-faceLeft')
    }
    else if (isRunningLeftAndFacingRight(isMovingLeft, isMovingRight, this.game.input.worldX, RS.player.x)) {
        RS.player.playerSprite.animations.play('runLeft-faceRight')
    }
    else if (isRunningRightAndFacingLeft(isMovingLeft, isMovingRight, this.game.input.worldX, RS.player.x)) {
        RS.player.playerSprite.animations.play('runRight-faceLeft')
    }
    else if (isRunningRightAndFacingRight(isMovingLeft, isMovingRight, this.game.input.worldX, RS.player.x)) {
        RS.player.playerSprite.animations.play('runRight-faceRight')
    }

    // Standing still and facing right
    if (
        (
            isNotMoving(isMovingLeft, isMovingRight) ||
            this.game.input.activePointer.rightButton.isDown ||
            isJumpJetInputActive.call(this)
        ) &&
        this.game.input.worldX >= RS.player.x
    ) {
        RS.player.playerSprite.frame = GameConsts.STANDING_RIGHT_FRAME
    }

    // Standing still and facing left
    if (
        (isNotMoving(isMovingLeft, isMovingRight) ||
        this.game.input.activePointer.rightButton.isDown ||
        isJumpJetInputActive.call(this)
        ) &&
        this.game.input.worldX < RS.player.x
    ) {
        RS.player.playerSprite.frame = GameConsts.STANDING_LEFT_FRAME
    }

    // If the LEFT key is down, set the player velocity to move left
    if (isMovingLeft) {
        RS.player.body.acceleration.x = -GameConsts.SLOPE_FEATURES.acceleration
    }

    // If the RIGHT key is down, set the player velocity to move right
    if (isMovingRight) {
        RS.player.body.acceleration.x = GameConsts.SLOPE_FEATURES.acceleration
    }

    // Stand still
    if (isNotMoving(isMovingLeft, isMovingRight)) {
        RS.player.body.acceleration.x = 0
        RS.player.playerSprite.animations.stop()
    }
}
