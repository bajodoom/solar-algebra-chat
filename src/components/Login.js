import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./Login.module.css";

const Login = ({ setMemberUsername }) => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    setMemberUsername(username);
  };

  return (
    <Form className={styles.loginForm}>
      <Form.Group controlId="formUsername">
        <Form.Label className={styles.customLabel}>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Unesite korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleLogin}>
        Login
      </Button>
    </Form>
  );
};

export default Login;
