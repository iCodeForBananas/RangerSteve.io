import React, { PropTypes } from 'react'

export default function HudSettingsButton({
    onButtonClick
}) {
    return (
        <div
            className="hud-settings hud-item"
            onButtonClick={ onButtonClick }
        ></div>
    )
}

HudSettingsButton.propTypes = {
    onButtonClick: PropTypes.func.isRequired
}
