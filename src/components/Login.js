import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./Login.module.css";

const Login = ({ setMemberUsername }) => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    setMemberUsername(username); // Postavite korisničko ime u App.js stanje
  };

  return (
    <Form className={styles.loginForm}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your username"
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

/* import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      onLogin(username);
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleChange}
          placeholder="Enter your username"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login; */
