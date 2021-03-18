import React from "react";
import { Button } from "reactstrap";
import Header from "../page-elements/Header/Header";

function Home() {
  return (
    <>
      <Header userName="spemakhov" />
      <h1>Home</h1>
      <p>This is the home page.</p>
      <Button color="danger">Danger!</Button>
    </>
  );
}

export default Home;
