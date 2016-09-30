import GameConsts from './GameConsts'
import Maps from './Maps'
import actions from '../actions'

export default function PlayerSpriteHandler() {
    const state = this.game.store.getState()
    const spawnPoint = Maps[state.room.map].getRandomSpawnPoint()
    const primaryWeaponId = this.game.store.getState().player.selectedPrimaryWeaponId
    const selectedPrimaryWeapon = GameConsts.WEAPONS[primaryWeaponId]
    const secondaryWeaponId = this.game.store.getState().player.selectedSecondaryWeaponId
    const selectedSecondaryWeapon = GameConsts.WEAPONS[secondaryWeaponId]

    this.game.store.dispatch(actions.player.setPrimaryAmmoRemaining(selectedPrimaryWeapon.ammo))
    this.game.store.dispatch(actions.player.setSecondaryAmmoRemaining(selectedSecondaryWeapon.ammo))

    this.jumpjetFx = this.game.add.audio('jumpjet')
    this.playerGroup = this.game.add.group()
    this.leftArmGroup = this.game.add.group()
    this.rightArmGroup = this.game.add.group()

    // Player
    this.player = this.add.sprite(spawnPoint.x, spawnPoint.y)
    this.player.anchor.setTo(GameConsts.PLAYER_ANCHOR)

    //  We need to enable physics on the player
    this.physics.arcade.enable(this.player)
    this.player.width = GameConsts.PLAYER_SPRITE_WIDTH
    this.player.height = GameConsts.PLAYER_SPRITE_HEIGHT
    this.player.body.setSize(GameConsts.PLAYER_BODY_WIDTH, GameConsts.PLAYER_BODY_HEIGHT)
    this.game.slopes.enable(this.player)
    this.physics.arcade.gravity.y = GameConsts.SLOPE_FEATURES.gravity

    const body = this.player.body
    body.offset.setTo(0, -14)

    // Add a touch of tile padding for the collision detection
    body.tilePadding.x = 1
    body.tilePadding.y = 1

    // Set player minimum and maximum movement speed
    body.maxVelocity.x = GameConsts.MAX_VELOCITY_X
    body.maxVelocity.y = GameConsts.MAX_VELOCITY_Y

    // Add drag to the player that slows them down when they are not accelerating
    body.drag.x = GameConsts.SLOPE_FEATURES.dragX
    body.drag.y = GameConsts.SLOPE_FEATURES.dragY

    // Update player body Arcade Slopes properties
    body.slopes.friction.x = GameConsts.SLOPE_FEATURES.frictionX
    body.slopes.friction.y = GameConsts.SLOPE_FEATURES.frictionY
    body.slopes.preferY    = GameConsts.SLOPE_FEATURES.minimumOffsetY

    // Make player collide with world boundaries so he doesn't leave the stage
    this.player.body.collideWorldBounds = true

    // Left jump jet
    this.leftJumpjet = this.game.make.sprite(0, 0, 'jumpjet')
    this.leftJumpjet.anchor.setTo(0)
    this.leftJumpjet.scale.setTo(0.07)
    this.leftJumpjet.animations.add('thrust', [0,1,2,3,4,5,6,7,8,9,10,11,12], 20, true)
    this.leftJumpjet.animations.play('thrust')
    this.leftJumpjet.y = GameConsts.PLAYER_BODY.LEFT_JUMP_JET_X
    this.leftJumpjet.x = GameConsts.PLAYER_BODY.LEFT_JUMP_JET_Y
    this.leftJumpjet.visible = false
    this.player.addChild(this.leftJumpjet)

    // Right jump jet
    this.rightJumpjet = this.game.make.sprite(0, 0, 'jumpjet')
    this.rightJumpjet.anchor.setTo(0)
    this.rightJumpjet.scale.setTo(0.07)
    this.rightJumpjet.animations.add('thrust', [0,1,2,3,4,5,6,7,8,9,10,11,12], 20, true)
    this.rightJumpjet.animations.play('thrust')
    this.rightJumpjet.y = GameConsts.PLAYER_BODY.RIGHT_JUMP_JET_X
    this.rightJumpjet.x = GameConsts.PLAYER_BODY.RIGHT_JUMP_JET_Y
    this.rightJumpjet.visible = false
    this.player.addChild(this.rightJumpjet)

   // Player sprite
    this.playerSprite = this.add.sprite(0, 0, 'player')
    this.playerSprite.anchor.setTo(.5)

    //  Our two animations, walking left and right.
    this.playerSprite.animations.add('runRight-faceRight', [0,1,2,3,4,5], GameConsts.ANIMATION_FRAMERATE, true)
    this.playerSprite.animations.add('runLeft-faceLeft', [7,8,9,10,11,12], GameConsts.ANIMATION_FRAMERATE, true)
    this.playerSprite.animations.add('runRight-faceLeft', [14,15,16,17,18,19], GameConsts.ANIMATION_FRAMERATE, true)
    this.playerSprite.animations.add('runLeft-faceRight', [21,22,23,24,25,26], GameConsts.ANIMATION_FRAMERATE, true)
    // this.player.animations.add('death', GameConsts.ANIMATION_DEATH, 20, false)

    this.game.store.dispatch(actions.player.setPrimaryWeapon(GameConsts.WEAPONS[primaryWeaponId]))
    this.game.store.dispatch(actions.player.setSecondaryWeapon(GameConsts.WEAPONS[secondaryWeaponId]))

    // Left arm
    this.leftArmSprite = this.game.add.sprite(0, 0, 'player-body-parts')
    this.leftArmSprite.anchor.setTo(.8, .2)
    this.leftArmSprite.scale.setTo(.3)
    this.leftArmSprite.rotation = 83
    this.leftArmSprite.animations.frame = 0
    this.leftArmSprite.scale.y *= -1
    this.leftArmGroup.add(this.leftArmSprite)

    // Gun
    this.currentWeaponSprite = this.game.add.sprite(
        selectedPrimaryWeapon.position.spriteX,
        selectedPrimaryWeapon.position.spriteY,
        selectedPrimaryWeapon.id
    )
    this.currentWeaponSprite.scale.setTo(selectedPrimaryWeapon.position.scale)
    this.currentWeaponSprite.rotation = selectedPrimaryWeapon.position.rotation

    // Right arm
    this.rightArmGroup.add(this.currentWeaponSprite)
    this.rightArmSprite = this.game.add.sprite(0, 0, 'player-body-parts')
    this.rightArmSprite.anchor.setTo(.8, .2)
    this.rightArmSprite.scale.setTo(.3)
    this.rightArmSprite.rotation = 83.4
    this.rightArmSprite.animations.frame = 2
    this.rightArmSprite.scale.y *= -1
    this.rightArmGroup.add(this.rightArmSprite)

    this.player.addChild(this.leftArmGroup)
    this.leftArmGroup.pivot.x = 0
    this.leftArmGroup.pivot.y = 0
    this.leftArmGroup.x = GameConsts.PLAYER_FACE.LEFT.LEFT_ARM_X
    this.leftArmGroup.y = GameConsts.PLAYER_FACE.LEFT.LEFT_ARM_Y

    this.player.addChild(this.playerSprite)

    this.player.addChild(this.rightArmGroup)
    this.rightArmGroup.pivot.x = 0
    this.rightArmGroup.pivot.y = 0
    this.rightArmGroup.x = GameConsts.PLAYER_FACE.LEFT.RIGHT_ARM_X
    this.rightArmGroup.y = GameConsts.PLAYER_FACE.LEFT.RIGHT_ARM_Y

    this.muzzleFlash = this.game.make.sprite(0, 0, 'muzzle-flash')
    this.muzzleFlash.scale.setTo(.15)
    this.muzzleFlash.animations.add('flash', [0,1,2,3,4,5], 20, true)
    this.muzzleFlash.animations.play('flash')
    this.muzzleFlash.y = GameConsts.PLAYER_BODY.MUZZLE_FLASH_X
    this.muzzleFlash.x = GameConsts.PLAYER_BODY.MUZZLE_FLASH_Y

    this.muzzleFlash.x = selectedPrimaryWeapon.position.muzzleFlashX
    this.muzzleFlash.y = selectedPrimaryWeapon.position.muzzleFlashY

    this.muzzleFlash.visible = false
    this.currentWeaponSprite.addChild(this.muzzleFlash)

    this.player.anchor.set(.5)

    /**
     * Camera Settings
     */
    this.camera.follow(this.player)
    this.camera.lerp.setTo(0.2, 0.2)
}
