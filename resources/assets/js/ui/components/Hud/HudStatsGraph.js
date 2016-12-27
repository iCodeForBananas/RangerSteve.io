import React from 'react'
import autobind from 'react-autobind'

import Stats from '../../../lib/Stats'

export default class HudStatsGraph extends React.PureComponent {
    constructor(props) {
        super(props)
        autobind(this)
    }

    shouldComponentUpdate() {
        return false
    }

    componentDidMount() {
        this._stats = new Stats({
            container: this.refs.statsContainer,
            cssText: '',
        })

        requestAnimationFrame(this.loop)
    }

    loop() {
        this._stats.update()
        requestAnimationFrame(this.loop)
    }

    render() {
        return (
            <div ref="statsContainer" {...this.props} />
        )
    }
}
