import React from "react";
import { Button } from "reactstrap";

type LoginStageOneProps = {
  username: string;
  usernameError: string;
  handleButtonClicked: (username: string) => void;
  handleUsernameInputChange: (e: React.FormEvent) => void;
};

function LoginStageOne(props: LoginStageOneProps) {
  return (
    <form
      id="login-stage-1"
      action=""
      className="box bg-dark text-light login-form"
    >
      <h1>Авторизуйтесь</h1>
      <p>Введіть телеграм-ім'я</p>
      <div className="input-wrapper">
        <p id="username-error" className="text-danger input-error">
          {props.usernameError}
        </p>
        <input
          type="text"
          name="username"
          id="login-view__username-input"
          placeholder="my-tg-name"
          onChange={props.handleUsernameInputChange}
        />
      </div>
      <Button
        color="primary"
        onClick={() => props.handleButtonClicked(props.username)}
      >
        Отримати код входу
      </Button>
    </form>
  );
}

export default LoginStageOne;
