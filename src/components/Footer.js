import React from 'react';
import { Container, Typography } from '@mui/material';

function Footer() {
  return (
    <footer className="footer">
      <Container maxWidth="lg">
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} Agreement Management System
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
