'use client';
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
export default function Header() {
 const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path); // Redirige al path especificado
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1A005B' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}> 
          <Box display="flex" alignItems="center">
        <Link href="/home" style={{ cursor: 'pointer' }}>
         <Image
            src="/logo-flit.png"
            alt="Logo"
            width={200}
            height={50}
            style={{ marginRight: '10px',marginTop: '5px' }}
          />
          <span style={{ color: 'white',marginTop:'10px' }}>Sistema de Gestión de Trámites</span>
        </Link>
          </Box>
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => handleNavigate('/dashboard')}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={() => handleNavigate('/tramites')}>
            Trámites
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
