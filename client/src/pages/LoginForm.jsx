import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

const LoginForm = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = data.login.token;
      Auth.login(token);
    } catch (e) {
      console.error("Error in handleFormSubmit:", e);
      setShowAlert(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Incorrect email or password.
        </Alert>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="youremail@test.com"
            name="email"
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="******"
            name="password"
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          type="submit"
          variant="success"
          disabled={!(formState.email && formState.password)}
        >
          Submit
        </Button>
      </Form>

      <Link className="link-btn" to="/signup">
        Don't have an account? Sign up!
      </Link>
    </>
  );
};

export default LoginForm;

