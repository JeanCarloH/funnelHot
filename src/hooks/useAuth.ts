import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { mockLogin } from '@/lib/auth';
import swal from 'sweetalert2';
import { User,LoginCredentials} from '@/types/auth';


export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const { user, isAuthenticated, login: storeLogin, logout: storeLogout } = useAuthStore();

  // Función para iniciar sesión
  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = mockLogin(credentials.email, credentials.password);
      
      if (result.success) {
        storeLogin({ email: credentials.email });
        router.push('/home');
        return true;
      } else {
        throw new Error('Credenciales inválidas');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al iniciar sesión';
      setError(errorMessage);
      
      swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    storeLogout();
    router.push('/login');
  };

  const checkAuth = () => {
    if (!isAuthenticated) {
      router.replace('/login');
      return false;
    }
    return true;
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    checkAuth,
  };
};