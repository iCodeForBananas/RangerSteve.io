import React from 'react';

export function Footer() {
  return (
    <footer className="navbar navbar-sm navbar-default navbar-fixed-bottom">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#secondary-nav"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <ul className="nav navbar-nav nav-pills">
            <li>
              <a style={{ color: '#AAA' }} href="/credits" className="btn btn-link">
                Credits
              </a>
            </li>
            <li>
              <a
                style={{ color: '#AAA' }}
                href="http://www.addictinggames.com/"
                className="btn btn-link"
                target="_blank"
                rel="noopener noreferrer"
                title="Addicting Games"
              >
                Play more games
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
