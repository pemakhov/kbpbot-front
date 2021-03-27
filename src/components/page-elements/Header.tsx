import React from "react";
import {
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function Header(props: { handleLogOut: () => void }) {
  const { handleLogOut } = props;

  return (
    <header>
      <Navbar color="dark" dark expand="md">
        <Container>
          <NavbarBrand href="/">@kbpfuckingbot</NavbarBrand>
          <Nav className="mr-auto nav-pills" navbar>
            <NavItem>
              <NavLink className="active" href="#">
                Phones
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Birthdays</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Users</NavLink>
            </NavItem>
          </Nav>
          <NavLink
            className="text-light"
            href="#"
            onClick={() => handleLogOut()}
          >
            Log out
          </NavLink>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
