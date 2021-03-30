import { Navbar, Nav } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import VoteModal from "../VoteModal/VoteModal";
import { useContext } from "react";
import { UsernameContext } from "../../context";
import "./HeaderNavbar.css";

const HeaderNavbar = () => {
  const [username] = useContext(UsernameContext);

  return (
    <Navbar bg="dark" variant="dark">
      <IndexLinkContainer to="/">
        <Nav.Link className="sw-font">api wars</Nav.Link>
      </IndexLinkContainer>

      <Nav className="ml-auto custom-nav">
        {username === "" ? (
          <>
            <IndexLinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </IndexLinkContainer>
            <IndexLinkContainer to="/register">
              <Nav.Link>Register</Nav.Link>
            </IndexLinkContainer>
          </>
        ) : (
          <>
            <VoteModal />
            <IndexLinkContainer to="/logout">
              <Nav.Link>Logout</Nav.Link>
            </IndexLinkContainer>
          </>
        )}
        {username !== "" && (
          <Navbar.Brand>{`Signed in as ${username.toUpperCase()}`}</Navbar.Brand>
        )}
      </Nav>
    </Navbar>
  );
};

export default HeaderNavbar;
