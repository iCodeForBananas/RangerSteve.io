import Boot from './states/Boot'
import Deathmatch from './states/Deathmatch'
import EndOfRound from './states/EndOfRound'

export default function(store) {
    const game = new Phaser.Game('100%', '100%', Phaser.AUTO)
    game.store = store

    window.RangerSteve = {
        Boot,
        Deathmatch,
        EndOfRound
    }

    game.state.add('Boot', RangerSteve.Boot)
    game.state.add('Deathmatch', RangerSteve.Deathmatch)
    game.state.add('EndOfRound', RangerSteve.EndOfRound)

    game.state.start('Boot')
}
