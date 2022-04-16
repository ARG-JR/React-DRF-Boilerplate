import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../features/auth/authSlice";

import { useAppDispatch } from "../../hooks/store";
import { TokenResponse, UserCredentials } from "../../models/Auth";
import { useLoginMutation } from "../../services/auth";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const credentials: UserCredentials = {
      email: email,
      password: password,
    };

    try {
      const response: TokenResponse = await login(credentials).unwrap();
      localStorage.setItem("refreshToken", response.refreshToken);
      dispatch(
        setCredentials({
          user: response.user,
          token: response.accessToken,
        })
      );
      navigate("/");
    } catch (err) {
      localStorage.removeItem("refreshToken");
    }
  };

  return (
    <Card className="m-2">
      <Card.Body>
        <Card.Title className="text-center mb-4">Sign In</Card.Title>
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
              <Button
                disabled={isLoading}
                className="w-100"
                type="submit"
                variant="primary">
                {isLoading && <Spinner size="sm" animation="border" />} Sign In
              </Button>
            </Col>
          </Row>
        </Form>
        <div className="text-center mt-2">
          <small className="text-muted">
            Need an account? <Link to="/signup">Sign Up</Link>
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SignInForm;
