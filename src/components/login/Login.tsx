import React, { Component } from "react";
import LoginView from "./Login-view";

class Login extends Component<{
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}> {
  constructor(props: {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    super(props);
    this.state = {};
  }

  render() {
    return <LoginView />;
  }
}

export default Login;
