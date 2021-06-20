import React, { useContext } from 'react';
import loggedInContext from '../contexts/loggedInContext';
import Button from '../components/Button';

const Header = () => {
  const { loggedIn, logOut } = useContext(loggedInContext);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand colo" href="/">
            @kbp
            <s>fucking</s>
            bot
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
            </ul>
          </div>
          {loggedIn ? (
            <Button className="btn nav-item" onClick={logOut}>
              Log Out
            </Button>
          ) : (
            <a className="nav-link active" aria-current="page" href="/login">
              Log In
            </a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
