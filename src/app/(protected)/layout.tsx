'use client';

import React from 'react';
import { Box } from '@mui/material';
import Header from "../../components/header";
import Footer from "@/components/footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />

      {/* Contenido que crece según sea necesario */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
