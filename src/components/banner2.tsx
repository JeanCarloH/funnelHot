'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export default function AgendarAsesoriaBanner() {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#1A0050',
        textAlign: 'center',
        py: { xs: 6, md: 8 },
        px: 2,
      }}
    >
      {/* Icono principal */}
      <SupportAgentIcon sx={{ fontSize: 60, color: '#7f5af0', mb: 2 }} />

      {/* Título principal */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          color: '#FFFFFF',
          mb: 1,
        }}
      >
        ¡Agenda con nosotros tu asesoría personalizada
        <br />
        y muestra de nuestros sistemas inteligentes!
      </Typography>

      {/* Subtítulo */}
      <Typography
        variant="subtitle1"
        sx={{
          color: '#FFFFFF',
          mb: 3,
        }}
      >
        ¡Desde donde estés!
      </Typography>

      {/* Botón */}
      <Button
        variant="contained"
        startIcon={<AccessTimeIcon />}
        sx={{
          backgroundColor: '#FF8A3D',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '30px',
          px: 4,
          py: 1.5,
          '&:hover': {
            backgroundColor: '#e67a33',
          },
        }}
      >
        AGENDAR ASESORÍA
      </Button>
    </Box>
  );
}
