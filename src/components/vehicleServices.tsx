import React from 'react';
import { Box, Typography, Grid, Paper, Button, Container } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ChecklistIcon from '@mui/icons-material/Checklist';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const serviceCard = {
  height: '220px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 3,
  backgroundColor: '#5900ff',
  color: 'white',
  borderRadius: '8px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  }
};

const iconStyle = {
  fontSize: '50px',
  marginBottom: '16px',
  color: 'white',
};

export default function VehicleServices() {
  return (
<Container maxWidth={false} disableGutters sx={{ width: '100%',display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          sx={{ 
            color: '#2D0072', 
            fontWeight: 'bold',
            position: 'relative',
            display: 'inline-block',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              height: '2px',
              width: '100px',
              backgroundColor: '#2D0072',
              top: 0
            },
            '&::before': {
              left: '-120px'
            },
            '&::after': {
              right: '-120px'
            },
            pb: 1
          }}
        >
          ¡TODO LO QUE PUEDES HACER!
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={serviceCard}>
            <DirectionsCarIcon sx={iconStyle} />
            <Typography variant="h6" align="center">
              Realizar la Matrícula Inicial de tu vehículo
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={serviceCard}>
            <CompareArrowsIcon sx={iconStyle} />
            <Typography variant="h6" align="center">
              Traspasar tu (s) vehículo (s)
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={serviceCard}>
            <AssignmentIndIcon sx={iconStyle} />
            <Typography variant="h6" align="center">
              Gestionar tus comparendos
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={serviceCard}>
            <ChecklistIcon sx={iconStyle} />
            <Typography variant="h6" align="center">
              Aprobar o rechazar trámites de forma segura
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button 
          variant="outlined" 
          endIcon={<OpenInNewIcon />}
          sx={{ 
            borderColor: '#FF9800', 
            color: '#FF9800', 
            borderRadius: '25px', 
            fontWeight: 'bold',
            px: 4,
            '&:hover': {
              borderColor: '#FF9800',
              backgroundColor: 'rgba(255, 152, 0, 0.1)',
            }
          }}
        >
          CONOCE MÁS AQUÍ
        </Button>
      </Box>
    </Container>
  );
}