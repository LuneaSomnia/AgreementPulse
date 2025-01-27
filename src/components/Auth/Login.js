import React, { useState } from 'react';
import { TextField, Button, Card, Typography } from '@mui/material';

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <Card className="login-form">
      <Typography variant="h5">Welcome to AgreementPulse</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          value={credentials.email}
          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
        />
        <TextField
          label="Password"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Card>
  );
}
export default Login;

