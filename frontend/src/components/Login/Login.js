import { Button, Form, Container, Col } from "react-bootstrap";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UsernameContext } from "../../context";
// import "./Login.css";

const Login = () => {
  const [usernameInput, passwordInput, handleSubmit] = useUserAuth("/login");

  const [username] = useContext(UsernameContext);

  if (username !== "") {
    return <Redirect to="/" />;
  }

  return (
    <Container className="d-flex justify-content-center">
      <Col lg={4} md={6} sm={8}>
        <Form onSubmit={handleSubmit} className="form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" ref={usernameInput} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" ref={passwordInput} />
          </Form.Group>
          <Button variant="info" type="submit">
            Login
          </Button>
        </Form>
      </Col>
    </Container>
  );
};

export default Login;
