export const openSettingsModal = () => {
    return {
        type: 'OPEN_SETTINGS_MODAL',
        value: true
    }
}

export const closeSettingsModal = () => {
    return {
        type: 'CLOSE_SETTINGS_MODAL',
        value: false
    }
}

export const openChatModal = () => {
    return {
        type: 'OPEN_CHAT_MODAL',
        value: true
    }
}

export const closeChatModal = () => {
    return {
        type: 'CLOSE_CHAT_MODAL',
        value: false
    }
}

export const setShowKillConfirmed = (value) => {
    return {
        type: 'SET_SHOW_KILL_CONFIRMED',
        value
    }
}

export const setSettingsView = (value) => {
    return {
        type: 'SET_SETTINGS_VIEW',
        value
    }
}

export const setMusicVolume = (value) => {
    return {
        type: 'SET_MUSIC_VOLUME',
        value
    }
}

export const setSfxVolume = (value) => {
    return {
        type: 'SET_SFX_VOLUME',
        value
    }
}

export const setKillingSpreeCount = (value) => {
    return {
        type: 'SET_KILLING_SPREE_COUNT',
        value
    }
}

export const setSettingsModalView = (value) => {
    return {
        type: 'SET_SETTINGS_MODAL_VIEW',
        value
    }
}

export const setState = (value) => {
    return {
        type: 'SET_STATE',
        value
    }
}