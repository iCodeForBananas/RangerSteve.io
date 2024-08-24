import GameConsts from "lib/GameConsts";
import actions from "../actions";
import range from "lodash/range";
import sample from "lodash/sample";

const rangeOfVariance = range(-7, 7, 1);
let muzzleFlashHandler = null;
let nextFire = null;
let lastWeaponId = null;

export default function FireShotgunShell(currentWeaponId) {
  const store = this.game.store;
  const state = store.getState();
  const currentWeapon = GameConsts.WEAPONS[currentWeaponId];
  const isPrimarySelected =
    store.getState().player.currentWeapon === "primaryWeapon";

  // Reset the fire rate if the user switched to a new gun (i.e. Barrett to Desert Eagle)
  nextFire = lastWeaponId === currentWeaponId ? nextFire : null;

  lastWeaponId = currentWeaponId;

  if (
    !state.room.id ||
    state.player.health <= 0 ||
    state.room.state !== "active" ||
    this.game.time.time < nextFire ||
    !window.RS.bullets
  )
    return;

  nextFire = this.game.time.time + currentWeapon.fireRate;

  let x = window.RS.player.x;
  let y = window.RS.player.y - 10;

  let pointerAngle = null;
  let pointerAngleDeg = null;
  for (let i = 0; i < 4; i++) {
    let bullet = window.RS.bullets.getFirstDead();
    if (!bullet) return console.error("No bullet sprite available.");

    bullet.bulletId = Math.round(Math.random() * 16000);
    bullet.damage = currentWeapon.damage;
    bullet.weaponId = currentWeaponId;
    bullet.alive = 1;
    bullet.alpha = 0;
    bullet.height = 2;
    bullet.width = 40;
    bullet.reset(x, y);

    if (pointerAngle === null) {
      pointerAngle = this.game.physics.arcade.moveToPointer(
        bullet,
        currentWeapon.bulletSpeed
      );
      bullet.rotation = pointerAngle;
      pointerAngleDeg = (pointerAngle * 180) / Math.PI;
    } else {
      const randomPointerAngleDeg = sample(rangeOfVariance) + pointerAngleDeg;
      const newVelocity = this.game.physics.arcade.velocityFromAngle(
        randomPointerAngleDeg,
        currentWeapon.bulletSpeed
      );
      bullet.body.velocity.x += newVelocity.x;
      bullet.body.velocity.y += newVelocity.y;
      bullet.rotation =
        (this.game.math.wrapAngle(randomPointerAngleDeg) * Math.PI) / 180;
    }

    // Shows the bullet after it has left the barrel so you don't have to line up the bullet with the barrel.
    setTimeout(function() {
      bullet.alpha = 1;
    }, 40);
  }

  // Show the muzzle flash for a short period of time and hide it unless the user is holding down fire.
  window.RS.player.rightArmSprite.frame =
    GameConsts.WEAPONS[currentWeaponId].shootingFrame;
  window.RS.player.isShooting = true;

  clearTimeout(muzzleFlashHandler);
  muzzleFlashHandler = setTimeout(() => {
    window.RS.player.rightArmSprite.frame =
      GameConsts.WEAPONS[currentWeaponId].frame;
  }, 30);

  // Shake camera for gun recoil
  this.camera.shake(0.0015, 100, true);

  window.RS.weaponSoundEffects[currentWeaponId].volume = state.game.sfxVolume;
  window.RS.weaponSoundEffects[currentWeaponId].play();

  if (isPrimarySelected) {
    store.dispatch(actions.player.decrementPrimaryAmmoRemaining());
  } else {
    store.dispatch(actions.player.decrementSecondaryAmmoRemaining());
  }
}
