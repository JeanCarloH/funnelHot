'use client';

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import ChatIcon from '@mui/icons-material/Chat';

export default function Banner() {
  return (
    
    <Box
      sx={{
        width: '100%',
        height: '570px',
        background: 'linear-gradient(135deg, #f5f7ff 0%, #e8e9fc 50%, #d4d2ff 100%)',
        position: 'relative',
        overflow: 'hidden'

      }}
    >
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <path
          d="M0,100 Q400,50 800,300 T1600,200"
          fill="none"
          stroke="#FF8A3D"
          strokeWidth="2"
          opacity="0.3"
        />
        <path
          d="M0,300 Q500,400 1000,200 T2000,300"
          fill="none"
          stroke="#5000FF"
          strokeWidth="2"
          opacity="0.2"
        />
        
        <circle cx="50" cy="50" r="20" fill="#5000FF" opacity="0.1" />
        <circle cx="1600" cy="400" r="80" fill="#FF8A3D" opacity="0.1" />
        <circle cx="200" cy="450" r="10" fill="#5000FF" opacity="0.1" />
      </svg>

      <Container  sx={{ width:'100%', height: '100%', position: 'relative' }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '50%',
              height: '100%',
              display: { xs: 'none', md: 'block' }
            }}
          >
            <Box
              sx={{
                width: '550px',
                height: '550px',
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                left: '-50px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              }}
            >
            </Box>
          </Box>
          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              pl: { xs: 0, md: 4 },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: '#5000FF',
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2,
                mb: 2,
                textTransform: 'uppercase',
              }}
            >
              ¡LA MEJOR
              <br />
              ALTERNATIVA DE
              <br />
              INTEGRACIÓN!
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: '#555',
                mb: 4,
                fontWeight: 500,
              }}
            >
              Gestión y solución para tus trámites
              <br />
              digitales de tránsito:
            </Typography>

            <Box
              sx={{
                mb: 4,
                pl: { xs: 0, md: 2 },
              }}
            >
              {[
                'Matrícula inicial',
                'Traspaso de vehículos',
                'Gestión de Comparendos',
                'Curso virtual para infractores',
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 1.5,
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    color: '#555',
                  }}
                >
                  <Box
                    sx={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#5000FF',
                      mr: 2,
                    }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Link href="/contacto" passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                startIcon={<ChatIcon />}
                sx={{
                  backgroundColor: '#FF8A3D',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '12px 24px',
                  borderRadius: '30px',
                  '&:hover': {
                    backgroundColor: '#e67a33',
                  },
                  boxShadow: '0 4px 15px rgba(255, 138, 61, 0.3)',
                }}
              >
                TE ASESORAMOS AQUÍ
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}