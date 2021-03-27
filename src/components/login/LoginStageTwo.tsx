import React from "react";

export default function LoginStageTwo() {
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
          test
        </p>
        <input
          type="text"
          name="username"
          id="login-view__username-input"
          placeholder="my-tg-name"
          onChange={() => {}}
        />
      </div>
    </form>
  );
}
