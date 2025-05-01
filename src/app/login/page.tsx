'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { useAuth, LoginCredentials } from '@/hooks/useAuth';

// Schema de validación con Zod
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const { login, loading } = useAuth();

  const onSubmit = async (data: LoginCredentials) => {
    await login(data);
  };

  return (
    <Box maxWidth={400} mx="auto" mt={10}>
      <Typography variant="h5" color="primary" mb={2}>Iniciar sesión</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Email"
          {...register('email')}
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={loading}
        />
        <TextField
          fullWidth
          type="password"
          label="Contraseña"
          {...register('password')}
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={loading}
        />
        <Button 
          fullWidth 
          type="submit" 
          variant="contained" 
          sx={{ mt: 2 }}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </Button>
      </form>
    </Box>
  );
}