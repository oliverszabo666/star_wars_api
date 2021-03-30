import { Button, Form, Col, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useContext } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UsernameContext, MessageContext } from "../../context";
import "./Register.css";

const Register = () => {
  const [usernameInput, passwordInput, handleSubmit] = useUserAuth("/register");

  const [username] = useContext(UsernameContext);
  const [message] = useContext(MessageContext);

  if (username !== "") {
    return <Redirect to="/" />;
  }

  if (
    message &&
    message.text === "Successful registration. Log in to continue."
  ) {
    return <Redirect to="/login" />;
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
            Register
          </Button>
        </Form>
      </Col>
    </Container>
  );
};

export default Register;
