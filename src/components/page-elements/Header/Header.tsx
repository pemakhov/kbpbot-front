import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

const Header = (props: { userName: string }) => {
  const { userName } = props;
  const logInLink = <Link to="/login">Log in</Link>;
  const logInText = userName ? `Hello, ${userName}` : logInLink;

  return (
    <div>
      <Navbar color="secondary" dark expand="md">
        <Container>
          <NavbarBrand href="/">@kbpfuckingbot</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="active" href="#">Phones</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Birthdays</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Users</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>{logInText}</NavbarText>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
