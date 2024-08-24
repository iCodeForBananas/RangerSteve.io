import React, { useEffect, useState } from 'react';
import toInteger from 'lodash/toInteger';
import get from 'lodash/get';

const getSortedPlayers = () => { return [] };

import HudChatHistory from '../components/Hud/HudChatHistory';
import HudAnnouncement from '../components/Hud/HudAnnouncement';
import HudKillLog from '../components/Hud/HudKillLog';
import HudChangeWeaponsButton from '../components/Hud/HudChangeWeaponsButton';
import HudSettingsButton from '../components/Hud/HudSettingsButton';
import HudKillingSpree from '../components/Hud/HudKillingSpree';
import HudTimer from '../components/Hud/HudTimer';
import HudGamemode from '../components/Hud/HudGamemode';
import HudTeamScore from '../components/Hud/HudTeamScore';
import HudHealth from '../components/Hud/HudHealth';
import HudJetpack from '../components/Hud/HudJetpack';
import HudAmmo from '../components/Hud/HudAmmo';
import HudKillConfirmed from '../components/Hud/HudKillConfirmed';
import HudLeaderboard from '../components/Hud/HudLeaderboard';
import HudStatsGraph from '../components/Hud/HudStatsGraph';
import SettingsModal from '../components/SettingsModal/SettingsModal';
import LeaderboardModal from '../components/LeaderboardModal/LeaderboardModal';
import RespawnModal from '../components/RespawnModal/RespawnModal';
import emitMessageSend from '../lib/emitMessageSend';
import RemainingFuelPercent from '../lib/RemainingFuelPercent';
import NetworkStats from '../components/NetworkStats/NetworkStats';
import HudNewChatMessage from '../components/Hud/HudNewChatMessage';
import HudPointmatchScore from '../components/Hud/HudPointmatchScore';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export const Game = ({
  player,
  room,
  game,
  onCloseSettingsModal,
  onSettingsViewChange,
  onOpenSettingsModal,
  onKeyboardControlChange,
  onSetAutoRespawn,
  onSetResetEventsFlag,
  onCloseChatModal,
  onOpenChatModal,
  onSfxVolumeChange,
  onReduceToMaxChatMessages,
  onPrimaryWeaponIdChange,
  onSecondaryWeaponIdChange
}) => {
  console.log(socket.connected)
  useEffect(() => {
    console.log('Connecting to server...', socket)

    // Listen for events
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('myEventResponse', (data) => {
      console.log('Received response:', data);
    });

    // Emit an event to the server
    socket.emit('myEvent', { message: 'Hello from React' });

    // Cleanup the connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const startEventHandler = () => {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    };

    const handleKeyDown = (e) => {
      if (
        (
          e.keyCode === parseInt(game.keyboardControls.newChatMessage) ||
          e.keyCode === window.Phaser.Keyboard.ENTER
        ) &&
        !game.chatModalIsOpen &&
        !game.settingsModalIsOpen
      ) {
        e.preventDefault();
        onOpenChatModal();
      }

      if (e.keyCode === window.Phaser.Keyboard.ESC) {
        e.preventDefault();
        onCloseSettingsModal();
        onCloseChatModal();
      }
    };

    startEventHandler();
  }, [game, onCloseChatModal, onCloseSettingsModal, onOpenChatModal]);

  const handleSendMessage = (message) => {
    onCloseChatModal();

    if (message.length === 0) return;

    onReduceToMaxChatMessages();
    emitMessageSend.call(this, message);
  };

  const handleSoundEffectVolumeChange = (volume) => {
    localStorage.setItem('sfxVolume', volume);
    onSfxVolumeChange(volume);
  };

  const handlePrimaryGunClick = (weapon) => {
    onPrimaryWeaponIdChange(weapon.id);
    localStorage.setItem('selectedPrimaryWeaponId', weapon.id);
  };

  const handleSecondaryGunClick = (weapon) => {
    localStorage.setItem('selectedSecondaryWeaponId', weapon.id);
    onSecondaryWeaponIdChange(weapon.id);
  };

  const isLeaderboardModalOpen = () => {
    return (game.leaderboardModalIsOpen || room.state === 'ended');
  };

  const handleOpenSettingsButton = () => {
    onOpenSettingsModal();
    onSettingsViewChange('settings');
  };

  const handleChangeWeaponsButton = () => {
    onOpenSettingsModal();
    onSettingsViewChange('default');
  };

  if (!player) {
    return 'Loading...';
  }

  const sortedPlayers = getSortedPlayers(room.players);
  const bestPlayer = get(sortedPlayers, '[0].score', 0) > 0
    ? sortedPlayers[0]
    : { nickname: '--', score: 0 };

  const isRespawnModalOpen = player && player.health <= 0 && room.state !== 'ended';

  const secondsRemaining = room && room.currentTime
    ? toInteger((room.roundEndTime - room.currentTime) / 1000)
    : 0;

  const fuelRemaining = player ? RemainingFuelPercent(player.jumpJetCounter) : 0;

  const ammoRemaining = player.currentWeapon === 'primaryWeapon'
    ? player.primaryAmmoRemaining
    : player.secondaryAmmoRemaining;

  const isWeaponReloading = (
    (player.currentWeapon === 'primaryWeapon' && player.isPrimaryReloading) ||
    (player.currentWeapon === 'secondaryWeapon' && player.isSecondaryReloading)
  );

  return (
    <div>
      <a className='hud-main-menu-button hud-item' href='/'>Back to Main Menu</a>
      <HudKillLog messages={game.killLogMessages} />
      <HudKillingSpree killingSpreeCount={player.killingSpreeCount} />
      <HudTimer secondsRemaining={secondsRemaining} />
      <HudGamemode gamemode={room.gamemode} mode={room.mode} />
      {room.gamemode === 'TeamDeathmatch' &&
        <HudTeamScore
          score1={room.redTeamScore}
          score2={room.blueTeamScore}
        />
      }
      {room.gamemode === 'Pointmatch' &&
        <HudPointmatchScore
          player={bestPlayer}
        />
      }
      <HudHealth health={player.health} />
      <HudJetpack fuelRemaining={fuelRemaining} />
      <HudAmmo
        ammo={ammoRemaining}
        isReloading={isWeaponReloading}
        isSwitching={player.isSwitchingWeapon}
      />
      <HudChangeWeaponsButton onButtonClick={handleChangeWeaponsButton} />
      <HudSettingsButton onButtonClick={handleOpenSettingsButton} />
      <HudLeaderboard
        players={sortedPlayers}
        room={room}
      />
      {room.announcement &&
        <HudAnnouncement announcement={room.announcement} />
      }
      <HudChatHistory
        messages={game.chatMessages}
      />
      <HudNewChatMessage
        isOpen={game.chatModalIsOpen}
        newChatMessageCharacter={+game.keyboardControls.newChatMessage}
        onSendMessage={handleSendMessage}
        onBlur={onCloseChatModal}
      />

      {isLeaderboardModalOpen() &&
        <LeaderboardModal
          player={player}
          players={sortedPlayers}
          room={room}
        />
      }

      {isRespawnModalOpen &&
        <RespawnModal
          onOpenSettingsModal={onOpenSettingsModal}
          onSettingsViewChange={onSettingsViewChange}
          room={room}
        />
      }

      {game.settingsModalIsOpen &&
        <SettingsModal
          game={game}
          mode={room.mode}
          onClose={onCloseSettingsModal}
          onKeyboardControlChange={onKeyboardControlChange}
          onPrimaryGunClick={handlePrimaryGunClick}
          onRespawnChange={onSetAutoRespawn}
          onSecondaryGunClick={handleSecondaryGunClick}
          onSetResetEventsFlag={onSetResetEventsFlag}
          onSfxVolumeChange={handleSoundEffectVolumeChange}
          onViewChange={onSettingsViewChange}
          player={player}
        />
      }

      {window.RS && window.window.RS.networkStats && game.isNetworkStatsVisible &&
        <NetworkStats stats={window.window.RS.networkStats} />
      }

      {game.isFpsStatsVisible &&
        <HudStatsGraph id='stats-panel' />
      }

      {game.showKillConfirmed &&
        <HudKillConfirmed />
      }
    </div>
  );
};
