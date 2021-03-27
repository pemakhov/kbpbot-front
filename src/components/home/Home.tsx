import React, { Component } from "react";
import { Button } from "reactstrap";
import Header from "../page-elements/Header";
import Footer from "../page-elements/Footer";
import { TUser } from "../../types/TUser";
import { TPhone } from "../../types/TPhone";
import { TBirthday } from "../../types/TBirthday";

type HomePropsType = {
  logOut: () => void;
};

enum DataType {
  phones = "phones",
  birthdays = "birthdays",
  users = "users",
}

class Home extends Component<HomePropsType> {
  logOut = this.props.logOut;

  state = {
    data: {
      phones: [],
      birthdays: [],
      users: [],
    },

    currentDataType: DataType.phones,
  };

  fetchData = async (type: DataType): Promise<unknown[]> => {
    const response = await fetch(`/api/${type}`, {
      method: "GET",
      headers: {
        "Content-Type": "text/json",
      },
    });
    const data = await response.json();

    return data;
  };

  async componentDidMount() {
    const res = await this.fetchData(DataType.phones);
    console.log(res);
  }

  render() {
    return (
      <>
        <main>
          <Header handleLogOut={this.logOut} />
          <div className="container pt-5 pb-5">
            <h1>Home</h1>
            <p>This is the home page.</p>
            <Button color="danger" onClick={() => this.logOut()}>
              Danger!
            </Button>
            <div className="push" />
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

export default Home;
