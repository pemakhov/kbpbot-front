import { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
            <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          )}
        </Route>
        <Route path="/">
          {loggedIn ? (
            <Home />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
