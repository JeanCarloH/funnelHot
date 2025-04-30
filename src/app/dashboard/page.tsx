
'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useState } from 'react';
import CreateFlowForm from '@/components/CreateFlowForm';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  return (
    <ProtectedRoute>
    <Box p={4}>
      <Typography variant="h4" color="black">Bienvenido al Dashboard</Typography>
      <Typography variant="h4" color="black" mb={3}>Dashboard</Typography>
      {!showForm ? (
        <Button variant="contained" onClick={() => setShowForm(true)}>
          Crear nuevo
        </Button>
      ) : (
        <CreateFlowForm />
      )}
    </Box>
    </ProtectedRoute>
  );
}
