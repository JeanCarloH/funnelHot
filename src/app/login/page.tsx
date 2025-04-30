
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { mockLogin } from '@/lib/auth'; 
import swal from 'sweetalert2';  

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6,"La contraseña debe tener al menos 6 caracteres"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const onSubmit = (data: LoginData) => {
    const result = mockLogin(data.email, data.password);
    if (result.success) {
        login({ email: data.email });
        router.push('/dashboard');
      } else {
        console.log("Error en las credenciales");
        swal.fire({
            title: 'Error',
            text: 'Credenciales inválidas',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
      }
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
        />
        <TextField
          fullWidth
          type="password"
          label="Contraseña"
          {...register('password')}
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
          Ingresar
        </Button>
      </form>
    </Box>
  );
}
