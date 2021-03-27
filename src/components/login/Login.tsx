import React, { Component } from "react";
import LoginStageOne from "./LoginStageOne";
import LoginStageTwo from "./LoginStageTwo";
import { Container, Card } from "reactstrap";
import "./Login.css";

type LoginPropsType = {
  logIn: (accessToken: string) => void;
};

type LoginStateType = {
  stage: number;
  username: string;
  usernameError: string;
};

class Login extends Component<LoginPropsType, LoginStateType> {
  constructor(props: LoginPropsType) {
    super(props);

    this.state = {
      stage: 1,
      username: "",
      usernameError: "",
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleUsernameInputChange = this.handleUsernameInputChange.bind(this);
  }

  logIn = this.props.logIn;

  loginInput = document.getElementById("login-view__username-input");

  handleButtonClick(username: string) {
    console.log(username);
  }

  handleUsernameInputChange(e: React.FormEvent) {
    const element = e.currentTarget as HTMLInputElement;
    this.setState({ username: element.value });
  }

  render() {
    const form =
      this.state.stage === 1 ? (
        <LoginStageOne
          username={this.state.username}
          usernameError={this.state.usernameError}
          handleButtonClicked={this.handleButtonClick}
          handleUsernameInputChange={this.handleUsernameInputChange}
        />
      ) : (
        <LoginStageTwo />
      );

    return (
      <Container>
        <div className="row">
          <div className="col-md-6">
            <Card className="bg-light">{form}</Card>
          </div>
        </div>
      </Container>
    );
  }
}

export default Login;
