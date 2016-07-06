export default function() {
    this.bullets = this.game.add.group()
    this.bullets.createMultiple(50, 'bullet')
    this.bullets.setAll('checkWorldBounds', true)
    this.bullets.setAll('outOfBoundsKill', true)

    this.physics.arcade.enable(this.bullets)
    this.bullets.forEach(function(bullet) {
        bullet.body.height = 20
        bullet.body.width = 20
        bullet.height = 2
        bullet.width = 40
    }, this)
    this.game.slopes.enable(this.bullets)

    this.enemyBullets = this.game.add.group()
    this.enemyBullets.enableBody = true
    this.enemyBullets.createMultiple(50, 'bullet')
    this.enemyBullets.setAll('checkWorldBounds', true)
    this.enemyBullets.setAll('outOfBoundsKill', true)

    this.physics.arcade.enable(this.enemyBullets)
    this.enemyBullets.forEach(function(bullet) {
        bullet.body.height = 20
        bullet.body.width = 20
        bullet.height = 2
        bullet.width = 40
    }, this)
    this.game.slopes.enable(this.enemyBullets)
}