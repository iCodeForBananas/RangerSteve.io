import React from 'react';

export function Header() {
  return (
    <header className="navbar navbar-default navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#main-nav"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand ff-bangers ft18" href="/">
            RangerSteve.io
          </a>
        </div>

        <nav id="main-nav" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li>
              <a href="/how-to-play" className="btn btn-link">
                How To Play
              </a>
            </li>
            <li>
              <a className="btn btn-link" href="/create-a-room">
                Create a Room
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
