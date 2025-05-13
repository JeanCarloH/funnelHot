'use client';

import React from 'react';
import { Box, Typography, IconButton, Link as MuiLink } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NextLink from 'next/link';

const footerLinks = [
  { label: 'HOME', href: '/' },
  { label: 'NOSOTROS', href: '/nosotros' },
  { label: 'NUESTROS SERVICIOS', href: '/servicios' },
  { label: 'NUESTRO BLOG', href: '/blog' },
  { label: 'CONTÁCTANOS', href: '/contacto' },
  { label: 'POLÍTICA DE DATOS', href: '/politica-de-datos' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1A0050',
        color: '#fff',
        py: 4,
        px: 2,
        textAlign: 'center',
        position: 'relative',
        marginTop: '10px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 3,
          mb: 2,
        }}
      >
        {footerLinks.map((link) => (
          <MuiLink
            key={link.href}
            component={NextLink}
            href={link.href}
            underline="none"
            sx={{
              color: '#aaa',
              fontWeight: 500,
              fontSize: '0.875rem',
              '&:hover': {
                color: '#fff',
              },
            }}
          >
            {link.label}
          </MuiLink>
        ))}
      </Box>
      <Typography variant="body2" sx={{ color: '#aaa' }}>
        Copyright 2025 ©{' '}
        <Box component="span" sx={{ fontWeight: 700 }}>
          FLIT SAS
        </Box>
      </Typography>

      <IconButton
        onClick={scrollToTop}
        sx={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          border: '1px solid #aaa',
          color: '#aaa',
          '&:hover': {
            backgroundColor: '#2e0b6c',
            color: '#fff',
            borderColor: '#fff',
          },
        }}
      >
        <KeyboardArrowUpIcon />
      </IconButton>
    </Box>
  );
}
