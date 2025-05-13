'use client';
import { useState, ChangeEvent,useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  IconButton,
  Fab,
  Tooltip
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { deepPurple } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import usersMock from '../../mocks/users.json';
import ProtectedRoute from '@/components/ProtectedRoute';
import { User } from '@/types/user';
import { getAllUsers } from '../../services/userService'; 
import { updateUser } from '../../services/userService';
import { createUser } from '../../services/userService';
import { deleteUser } from '../../services/userService';
interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}

export default function DashboardPage() {

  const [users, setUsers] = useState<User[]>(usersMock);
  const [search, setSearch] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>({ id: 0, nombre: '', correo: '', rol: 'user' });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success'
  });
  let filteredUsers: User[] = [];
  if (Array.isArray(users)) {
    filteredUsers = users.filter((user) =>
      user.nombre.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    console.error("users no es un array:", users);
  }

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers(); 
        setUsers(usersData.data.users); 
      } catch (error) {
        setError('Error al obtener los usuarios');
      } finally {
        setLoading(false); 
      }
    };

    fetchUsers(); 
  }, []); 


  const handleOpenForm = (user: User | null = null) => {
     console.log("user", user);
    if (user) {
      setCurrentUser(user);
      setIsEditing(true);
    } else {
      setCurrentUser({ nombre: '', correo: '', rol: 'user' });
      setIsEditing(false);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value
    });
  };

  const handleSaveUser = async() => {
   
    if (!currentUser.nombre || !currentUser.correo) {
      setSnackbar({
        open: true,
        message: 'Por favor, complete todos los campos requeridos',
        severity: 'error'
      });
      return;
    }

    if (isEditing) {
      await updateUser(Number(currentUser.id), currentUser);
      setUsers(users.map(user => 
        user.id === currentUser.id ? currentUser : user
      ));
      setSnackbar({
        open: true,
        message: 'Usuario actualizado correctamente',
        severity: 'success'
      });
    } else {
        const response = await createUser(currentUser); 
        
        // Crear un nuevo objeto con el ID del servidor
        const newUserWithId = { 
          ...currentUser, 
          id: response.data.id  // Usar el ID devuelto por el servidor
        };
        
        // Actualizar el estado con el usuario completo
        setUsers(prevUsers => [...prevUsers, newUserWithId]);
      setSnackbar({
        open: true,
        message: 'Usuario añadido correctamente',
        severity: 'success'
      });
    }
    
    handleCloseForm();
  };


  const handleOpenDeleteDialog = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteUser = async() => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete.id));
      setSnackbar({
        open: true,
        message: 'Usuario eliminado correctamente',
        severity: 'info'
      });
    }
    handleCloseDeleteDialog();
    if (userToDelete?.id !== undefined) {
    await deleteUser(userToDelete.id);
  }

  };

 
  const handleCloseSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <ProtectedRoute>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" color="primary">
            Gestión de Usuarios
          </Typography>
          <Tooltip title="Añadir Usuario">
            <Fab 
              color="primary" 
              size="medium" 
              onClick={() => handleOpenForm()}
              aria-label="add"
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>

        <TextField
          label="Buscar usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Grid container spacing={3} mt={2}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card elevation={3} sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: deepPurple[500] }}>
                        {user.nombre[0]}
                      </Avatar>
                      <Box flexGrow={1}>
                        <Typography variant="subtitle1">{user.nombre}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.correo}
                        </Typography>
                        {user.rol && (
                          <Typography variant="caption" color="text.secondary">
                            {user.rol}
                          </Typography>
                        )}
                      </Box>
                      <Box>
                        <IconButton 
                          size="small" 
                          onClick={() => handleOpenForm(user)}
                          aria-label="editar"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error" 
                          onClick={() => handleOpenDeleteDialog(user)}
                          aria-label="eliminar"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                No se encontraron usuarios con ese criterio de búsqueda.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Formulario de usuario (crear/editar) */}
      <Dialog open={isFormOpen} onClose={handleCloseForm} maxWidth="sm" fullWidth>
        <DialogTitle>
          {isEditing ? 'Editar Usuario' : 'Añadir Usuario'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nombre"
            label="Nombre"
            type="text"
            fullWidth
            variant="outlined"
            value={currentUser.nombre}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            name="correo"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={currentUser.correo}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            name="rol"
            label="Rol"
            type="text"
            fullWidth
            variant="outlined"
            value={currentUser.rol || ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancelar</Button>
          <Button onClick={handleSaveUser} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar a {userToDelete?.nombre}? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDeleteUser} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notificaciones */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ProtectedRoute>
  );
}