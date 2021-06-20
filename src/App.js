import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { authenticate, removeTokens } from './service/authentication';
import LoggedInContext from './contexts/loggedInContext';
import Home from './pages/Home/Home';
import LogIn from './pages/LogIn/LogIn';
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(() => true);
  const logOut = () => {
    removeTokens();
    setLoggedIn(() => false);
  };

  useEffect(async () => {
    const isAuthenticated = await authenticate();

    if (isAuthenticated) {
      logIn();
    } else {
      logOut();
    }
  }, []);

  return (
    <LoggedInContext.Provider value={{ loggedIn, logIn, logOut }}>
      <Router>
        <Switch>
          <Route path="/login">
            {loggedIn ? <Redirect to="/" /> : <LogIn />}
          </Route>
          <Route path="/users">
            Users
          </Route>
          <Route path="/birthdays">
            Birthdays
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </LoggedInContext.Provider>
  );
};

export default App;
