import React from 'react';

export function HowToPlay() {
  return (
    <section className="container pv8 ph8 h100 text-center">
      <h1 className="ff-bangers tcw text-stroke ft35 mb1">How To Play</h1>

      <div className="row tcw text-left">
        <div className="col-md-10 col-md-offset-1">
          <div className="well">
            <div className="row navigation-header">
              <div className="col-xs-6">
                <a className="btn btn-primary btn-block" href="/">Back to Menu</a>
              </div>
              <div className="col-xs-6">
                <a className="btn btn-success btn-block" href="/game">Play Now</a>
              </div>
            </div>

            <h3 className="fwbold">How To Play</h3>
            <p>
              This game is about flying around the map and killing as many enemies as you can in highly intensive battles.
            </p>
            <p>
              To play with your friends, join a game and then share the link in your address bar with your friends.
            </p>
            <h3 className="fwbold">Controls</h3>
            <table className="table table-condensed tcw">
              <tbody>
                <tr>
                  <td><strong>Fly</strong></td>
                  <td>Right click and hold</td>
                  <td>Press and hold SHIFT</td>
                </tr>
                <tr>
                  <td><strong>Shoot</strong></td>
                  <td>Left click</td>
                  <td></td>
                </tr>
                <tr>
                  <td><strong>Aim</strong></td>
                  <td>Move your mouse</td>
                  <td></td>
                </tr>
                <tr>
                  <td><strong>Jump</strong></td>
                  <td>Press W</td>
                  <td></td>
                </tr>
                <tr>
                  <td><strong>Move left and right</strong></td>
                  <td>Press A and D</td>
                  <td></td>
                </tr>
                <tr>
                  <td><strong>Reload</strong></td>
                  <td>Press R</td>
                  <td></td>
                </tr>
                <tr>
                  <td><strong>Switch weapons</strong></td>
                  <td>Press Q</td>
                  <td></td>
                </tr>
              </tbody>
            </table>

            <h3 className="fwbold">Tips</h3>
            <ul>
              <li>Keep moving, flying, and firing on people as quickly as you can.</li>
              <li>Aim for people's heads because you do the most damage there.</li>
              <li>Try different weapons; some are better against others.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
