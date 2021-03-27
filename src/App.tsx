import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import "./App.css";

class App extends Component {
  constructor(props: any) {
    super(props);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  state: { loggedIn: boolean } = {
    loggedIn: !!localStorage.getItem("accessToken"),
  };

  logIn(accessToken: string) {
    localStorage.setItem("accessToken", accessToken);
    this.setState({ loggedIn: true });
  }

  logOut() {
    localStorage.removeItem("accessToken");
    this.setState({ loggedIn: false });
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/login">
            {this.state.loggedIn ? <Redirect to="/" /> : <Login logIn={this.logIn} />}
          </Route>
          <Route path="/">
            {this.state.loggedIn ? <Home logOut={this.logOut} /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
