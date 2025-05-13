'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  CircularProgress, 
  Paper,
  Container,
  InputAdornment,
  IconButton,
  Link,
  Divider
} from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '../../hooks/useAuth';
import { LoginCredentials } from '@/types/auth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

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
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginCredentials) => {
    await login(data);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <Paper 
        elevation={3} 
        sx={{ 
          padding: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          borderRadius: 2
        }}
      >
        {/* Logo y título */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Image
            src="/logo-flit.png"
            alt="Logo Sistema de Gestión de Trámites"
            width={220}
            height={55}
            priority
          />
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#1A005B', 
              mt: 2, 
              fontWeight: 600 
            }}
          >
            Sistema de Gestión de Trámites de Tránsito
          </Typography>
          <Divider sx={{ width: '100%', mt: 2 }} />
        </Box>

        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
          Ingrese sus credenciales para acceder al sistema
        </Typography>
        
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Email"
            {...register('email')}
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: '#1A005B' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#1A005B',
                },
              },
              '& label.Mui-focused': {
                color: '#1A005B',
              }
            }}
          />
          
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Contraseña"
            {...register('password')}
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#1A005B' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#1A005B',
                },
              },
              '& label.Mui-focused': {
                color: '#1A005B',
              }
            }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 2 }}>
            <Link href="#" underline="hover" sx={{ color: '#1A005B', fontSize: '0.875rem' }}>
              ¿Olvidó su contraseña?
            </Link>
          </Box>
          
          <Button 
            fullWidth 
            type="submit" 
            variant="contained" 
            sx={{ 
              mt: 2, 
              mb: 2, 
              backgroundColor: '#1A005B',
              padding: '12px',
              '&:hover': {
                backgroundColor: '#2A106B',
              }
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                Iniciando sesión...
              </>
            ) : 'Iniciar sesión'}
          </Button>
        </form>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
          Sistema de Gestión de Trámites © {new Date().getFullYear()}
        </Typography>
      </Paper>
    </Container>
  );
}