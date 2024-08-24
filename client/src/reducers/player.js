import storage from "store";
import has from "lodash/has";

import GameConsts from "lib/GameConsts";
import getRandomName from "../lib/getRandomName";

const storedPrimaryWeaponId = storage.get("selectedPrimaryWeaponId", "AK47");
const storedSecondaryWeaponId = storage.get(
  "selectedSecondaryWeaponId",
  "DesertEagle"
);

const initialPrimaryWeaponId = has(
  GameConsts,
  `WEAPONS.${storedPrimaryWeaponId}`
)
  ? storedPrimaryWeaponId
  : GameConsts.STARTING_PRIMARY_ID;

const initialSecondaryWeaponId = has(
  GameConsts,
  `WEAPONS.${storedSecondaryWeaponId}`
)
  ? storedSecondaryWeaponId
  : GameConsts.STARTING_SECONDARY_ID;

const initialState = {
  canRespawnTime: null,
  currentWeapon: "primaryWeapon",
  damageStats: {},
  facing: "right",
  health: 100,
  isPrimaryReloading: false,
  isSecondaryReloading: false,
  hasCanceledReloading: false,
  isSwitchingWeapon: false,
  isPremium: false,
  jumping: false,
  jumpJetCounter: 0,
  nextSelectedPrimaryWeaponId: initialPrimaryWeaponId,
  nextSelectedSecondaryWeaponId: initialSecondaryWeaponId,
  nickname: getRandomName(),
  primaryAmmoRemaining: 0,
  primaryWeapon: null,
  score: 0,
  secondaryAmmoRemaining: 0,
  secondaryWeapon: null,
  selectedPrimaryWeaponId: initialPrimaryWeaponId,
  selectedSecondaryWeaponId: initialSecondaryWeaponId,
  uid: null
};

const player = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PLAYER":
      return {
        ...state,
        ...action.value
      };

    case "SET_NEXT_SELECTED_PRIMARY_WEAPON_ID":
      return {
        ...state,
        nextSelectedPrimaryWeaponId: action.value
      };

    case "SET_NEXT_SELECTED_SECONDARY_WEAPON_ID":
      return {
        ...state,
        nextSelectedSecondaryWeaponId: action.value
      };

    case "SET_PRIMARY_IS_RELOADING":
      return {
        ...state,
        isPrimaryReloading: action.value
      };

    case "SET_SECONDARY_IS_RELOADING":
      return {
        ...state,
        isSecondaryReloading: action.value
      };

    case "SET_HAS_CANCELED_RELOADING":
      return {
        ...state,
        hasCanceledReloading: action.value
      };

    case "SET_IS_SWITCHING_WEAPON":
      return {
        ...state,
        isSwitchingWeapon: action.value
      };

    case "DECREMENT_SECONDARY_AMMO_REMAINING":
      return {
        ...state,
        secondaryAmmoRemaining: state.secondaryAmmoRemaining - 1
      };

    case "SET_SECONDARY_AMMO_REMAINING":
      return {
        ...state,
        secondaryAmmoRemaining: action.value
      };

    case "DECREMENT_PRIMARY_AMMO_REMAINING":
      return {
        ...state,
        primaryAmmoRemaining: state.primaryAmmoRemaining - 1
      };

    case "SET_PRIMARY_AMMO_REMAINING":
      return {
        ...state,
        primaryAmmoRemaining: action.value
      };

    case "SET_ATTACKING_DAMAGE_STATS":
      return {
        ...state,
        attackingDamageStats: action.value
      };

    case "SET_DAMAGE_STATS":
      return {
        ...state,
        damageStats: action.value
      };

    case "SET_RESPAWN_TIME":
      return {
        ...state,
        canRespawnTime: action.value
      };

    case "SET_KILLING_SPREE_COUNT":
      return {
        ...state,
        killingSpreeCount: action.value
      };

    case "SET_CURRENT_WEAPON":
      return {
        ...state,
        currentWeapon: action.value
      };

    case "SET_HEALTH":
      return {
        ...state,
        health: action.value
      };

    case "SET_SCORE":
      return {
        ...state,
        score: action.value
      };

    case "SET_JUMP_JET_COUNTER":
      return {
        ...state,
        jumpJetCounter: action.value
      };

    case "DECREMENT_JUMP_JET_COUNTER":
      return {
        ...state,
        jumpJetCounter: state.jumpJetCounter - action.value
      };

    case "INCREMENT_JUMP_JET_COUNTER":
      return {
        ...state,
        jumpJetCounter: state.jumpJetCounter + action.value
      };

    case "SET_JUMPING":
      return {
        ...state,
        jumping: action.value
      };

    case "SET_JUMPS":
      return {
        ...state,
        jumps: action.value
      };

    case "DECREMENT_JUMPS":
      return {
        ...state,
        jumps: state.jumps--
      };

    case "INCREMENT_JUMPS":
      return {
        ...state,
        jumps: state.jumps++
      };

    case "SET_FACING":
      return {
        ...state,
        facing: action.value
      };

    case "SET_SELECTED_PRIMARY_WEAPON_ID":
      return {
        ...state,
        selectedPrimaryWeaponId: action.value
      };

    case "SET_SELECTED_SECONDARY_WEAPON_ID":
      return {
        ...state,
        selectedSecondaryWeaponId: action.value
      };

    case "SET_PRIMARY_WEAPON":
      return {
        ...state,
        primaryWeapon: action.value
      };

    case "SET_SECONDARY_WEAPON":
      return {
        ...state,
        secondaryWeapon: action.value
      };

    case "SET_SHOW_KILL_CONFIRMED":
      return {
        ...state,
        showKillConfirmed: action.value
      };

    default:
      return state;
  }
};

export default player;
