import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { UserWithPassword } from "../../models/User";
import { useSignupMutation } from "../../services/auth";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  const [signup, { isLoading, error }] = useSignupMutation();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      // dispatch(signupFailed("Passwords must match"));
      return;
    }

    const user: UserWithPassword = {
      email: email,
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName,
    };

    try {
      await signup(user);
    } catch (err) {
    }
    navigate("/signin");
  };

  return (
    <Card className="m-2">
      <Card.Body>
        <Card.Title className="text-center mb-4">Sign Up</Card.Title>
        {error && <Alert variant="warning">{JSON.stringify(error)}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="pb-2">
                <Form.Control
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Email Address"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="pb-2">
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="pb-2">
                <Form.Control
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="pb-2">
                <InputGroup>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>

                  <Form.Control
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    placeholder="Username/Handle"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="pb-2">
                <InputGroup>
                  <Form.Control
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    placeholder="First Name"
                    required
                  />
                  <Form.Control
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    placeholder="Last Name"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                disabled={isLoading}
                className="w-100"
                type="submit"
                variant="primary">
                {isLoading && <Spinner size="sm" animation="border" />} Sign Up
              </Button>
            </Col>
          </Row>
        </Form>
        <div className="text-center mt-2">
          <small className="text-muted">
            Already have an account? <Link to="/signin">Sign In</Link>
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SignUpForm;
