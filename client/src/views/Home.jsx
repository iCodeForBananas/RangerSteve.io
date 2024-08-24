import React, { useState, useEffect } from 'react';

export function Home() {
  const ranks = [/* your ranks data here */];
  const firstNames = ['Ranger', 'Real Estate', /* other names */];
  const lastNames = ['Rick', 'Steve', /* other names */];

  const [newUsername, setNewUsername] = useState('');
  const [showIdlePlayerMessage, setShowIdlePlayerMessage] = useState(false);
  const [score, setScore] = useState(0);
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [premiumUserLookup, setPremiumUserLookup] = useState({});

  useEffect(() => {
    setShowIdlePlayerMessage(localStorage.getItem('showIdlePlayerMessage'));
    setNewUsername(getRandomName());
    localStorage.removeItem('showIdlePlayerMessage');
    if (!isChromeBrowser()) {
      showBrowserRecommendation();
    }
  }, []);

  function getRandomName() {
    return `${sample(firstNames)} ${sample(lastNames)}`;
  }

  function sample(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function claimUsername() {
    // Add your claim username logic here
  }

  function handleTrackPlayClick() {
    // Add your handle track play click logic here
  }

  function isChromeBrowser() {
    return navigator.userAgent.indexOf('Chrome') > -1;
  }

  function showBrowserRecommendation() {
    document.getElementById('browser-recommendation').style.display = 'block';
  }

  const numberOfRooms = 0;

  const rank = ranks.reduce((acc, minScore) => (score >= minScore ? ranks[minScore] : acc), ranks[0]);

  const isUserPremium = auth && premiumUserLookup[auth.uid];
  const isSameUsername = user && user.username === newUsername;
  const isEmptyUsername = !newUsername || newUsername.length === 0;

  return (
    <section className="container tcw pv8 ph8 text-center" id="home-container">
      <h1 className="ff-bangers tcw text-stroke ft45 mb1">
        R<small className="tcw">anger</small>S<small className="tcw">teve.io</small>
      </h1>
      <div className="row h100">
        <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
          <div id="browser-recommendation" className="alert alert-info text-center" style={{ display: 'none' }}>
            We recommend using Chrome browser for the best game performance
          </div>

          {showIdlePlayerMessage && (
            <div className="alert alert-info text-center">
              You have been kicked for being idle for {maxIdleSeconds} seconds.
            </div>
          )}

          <div className="well mb0 bra0">
            <div className="row">
              <div className="col-sm-12">
                <div className="input-group input-group-lg" style={{ width: '100%' }}>
                  <input
                    onKeyUp={(e) => e.key === 'Enter' && claimUsername()}
                    autoFocus
                    className="form-control"
                    maxLength="25"
                    placeholder="Enter your nickname..."
                    style={{
                      height: '29px',
                      borderRadius: '2px',
                      border: '0',
                      marginBottom: '15px'
                    }}
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value.trim())}
                  />
                </div>
              </div>
            </div>
            <div className="row mb3">
              <div className="col-sm-12">
                <a className="btn btn-success btn-block" onClick={handleTrackPlayClick} href="/game">
                  Play Now
                </a>
              </div>
            </div>
            <div className="row mb3">
              <div className="col-sm-12">
                <a className="btn btn-primary btn-block" href="/rooms">
                  Rooms {numberOfRooms > 0 ? `(${numberOfRooms})` : ''}
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <a style={{ color: '#AAA' }} href="http://www.addictinggames.com/" target="_blank" title="Addicting Games">
                  <img
                    src="/images/addicting-games-horizontal_rev-sponsor@2x.png"
                    style={{ maxWidth: '50%', boxShadow: 'none' }}
                    alt="Addicting Games"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
