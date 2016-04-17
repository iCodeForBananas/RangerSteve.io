import init from './core/Init'
import preload from './core/Preload'
import update from './core/Update'
import create from './core/Create'

const gameWidth = window.innerWidth
const gameHeight = window.innerHeight
let game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'ranger-steve-game')

game.state.add('Game', function() {
    this.currentWeapon = 0
    this.enemies = []
    this.ground
    this.platforms
    this.player
    this.socket

    this.game = game
    this.init = init
    this.preload = preload
    this.create = create
    this.update = update
    this.render = function() {
        game.debug.text('Active Bullets: ' + this.bullets.countLiving() + ' / ' + this.bullets.total, 32, 32);
    }
}, true)
