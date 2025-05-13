import React from 'react';
import { Container, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <div>
      <Container>
        <Typography variant="h4" gutterBottom color='primary' sx={{ marginTop: '20px',display: 'flex', justifyContent: 'center' }}>
          Bienvenido a la aplicación
        </Typography>
      </Container>
    </div>
  );
}
