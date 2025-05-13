'use client';

import React, { useEffect, useState, ChangeEvent } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  Chip,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  IconButton,
  Snackbar,
  Alert,
  Fab,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { format } from 'date-fns';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  getAllTramites,
  createTramite,
  updateTramite,
  deleteTramite,
} from '@/services/userService';
import { Tramite } from '@/types/process';
import { User } from '@/types/user';
import usersMock from '../../../mocks/users.json';
import { getAllUsers } from '../../../services/userService'; 

const getEstadoColor = (estado: string): 'success' | 'warning' | 'error' | 'default' => {
  switch (estado.toLowerCase()) {
    case 'completado':
      return 'success';
    case 'pendiente':
      return 'warning';
    case 'rechazado':
      return 'error';
    default:
      return 'default';
  }
};

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}

export default function TramitesPage() {
  const [tramites, setTramites] = useState<Tramite[]>([]);
  const [filteredTramites, setFilteredTramites] = useState<Tramite[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentTramite, setCurrentTramite] = useState<Partial<Tramite>>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tramiteToDelete, setTramiteToDelete] = useState<Tramite | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [users, setUsers] = useState<User[]>(usersMock);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTramites();
        const usersData = await getAllUsers(); 
        setTramites(response.data);
        setUsers(usersData.data.users); 
        setFilteredTramites(response.data);
        console.log('Trámites:', response.data);
        console.log('Usuarios:', usersData.data.users);
      } catch (err) {
        setSnackbar({
          open: true,
          message: 'Error al cargar trámites',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setFilteredTramites(
      tramites.filter((t) =>
        t.titulo.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
   
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
   
    const numericValue = value === "" ? null : Number(value);
    setCurrentTramite((prev) => ({ ...prev, usuario_id: numericValue }));
  };

  const handleOpenForm = (tramite: Tramite | null = null) => {
    if (tramite) {
      const userId = tramite.usuario ? tramite.usuario.id : null;

      setCurrentTramite({
        ...tramite,
        usuario_id: userId
      });
      setIsEditing(true);
    } else {
      setCurrentTramite({ 
        titulo: '', 
        descripcion: '', 
        estado: 'pendiente',
        usuario_id: null 
      });
      setIsEditing(false);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentTramite((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveTramite = async () => {
    if (!currentTramite.titulo) {
      setSnackbar({
        open: true,
        message: 'El título es requerido',
        severity: 'error',
      });
      return;
    }

    try {
      const tramiteToSave = { ...currentTramite };
      
      // Asegurarse de que el trámite se guarde con el campo usuario_id
      console.log("Guardando trámite con usuario_id:", tramiteToSave.usuario_id);
      
      if (isEditing && currentTramite.id) {
        const updated = await updateTramite(currentTramite.id, tramiteToSave);
        
        // Actualizar la lista local con el trámite actualizado
        setTramites((prev) =>
          prev.map((t) => (t.id === currentTramite.id ? {
            ...updated.data,
            usuario: users.find(u => u.id === tramiteToSave.usuario_id) || null
          } : t))
        );
        
        setSnackbar({
          open: true,
          message: 'Trámite actualizado',
          severity: 'success',
        });
      } else {
        const created = await createTramite(tramiteToSave);
        
      
        const newTramite = {
          ...created.data,
          usuario: users.find(u => u.id === tramiteToSave.usuario_id) || null
        };
        
   
        setTramites((prev) => {
          const updated = [...prev, newTramite];
       
          setFilteredTramites(
            updated.filter((t) =>
              t.titulo.toLowerCase().includes(search.toLowerCase())
            )
          );
          return updated;
        });
        setSnackbar({
          open: true,
          message: 'Trámite creado',
          severity: 'success',
        });
      }
      
  

      handleCloseForm();
    } catch (err) {
      console.error("Error al guardar trámite:", err);
      setSnackbar({
        open: true,
        message: 'Error al guardar trámite',
        severity: 'error',
      });
    }
  };

  const handleOpenDeleteDialog = (tramite: Tramite) => {
    setTramiteToDelete(tramite);
    setDeleteDialogOpen(true);
  };

  const handleDeleteTramite = async () => {
    if (!tramiteToDelete) return;
    try {
      await deleteTramite(tramiteToDelete.id);
      const updated = tramites.filter((t) => t.id !== tramiteToDelete.id);
      setTramites(updated);
      setFilteredTramites(updated);
      setSnackbar({
        open: true,
        message: 'Trámite eliminado',
        severity: 'info',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Error al eliminar trámite',
        severity: 'error',
      });
    }
    setDeleteDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };


  const getUserName = (tramite: Tramite) => {
    if (tramite.usuario) {
      return tramite.usuario.nombre;
    }
    return "Sin asignar";
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" sx={{color: '#1A005B'}}>Gestión de Trámites</Typography>
        <Tooltip title="Añadir Trámite">
          <Fab color="primary" onClick={() => handleOpenForm()}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>

      <TextField
        label="Buscar trámite"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearch}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={3}>
        {filteredTramites.map((tramite) => (
          <Grid item xs={12} sm={6} md={4} key={tramite.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">{tramite.titulo}</Typography>
                  <Chip
                    label={tramite.estado}
                    color={getEstadoColor(tramite.estado)}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {tramite.descripcion?.slice(0, 100)}...
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                  Creado el: {tramite.fechaCreacion ? format(new Date(tramite.fechaCreacion), 'dd/MM/yyyy') : 'N/A'}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block' }}>
                  Usuario asignado: {getUserName(tramite)}
                </Typography>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <IconButton onClick={() => handleOpenForm(tramite)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDeleteDialog(tramite)} color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Formulario */}
      <Dialog open={isFormOpen} onClose={handleCloseForm} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? 'Editar Trámite' : 'Nuevo Trámite'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="usuario-label">Usuario Asignado</InputLabel>
            <Select
              labelId="usuario-label"
              name="usuario_id"
              value={currentTramite.usuario_id !== null ? String(currentTramite.usuario_id) : ''}
              label="Usuario Asignado"
              onChange={handleSelectChange}
            >
              <MenuItem value="">
                <em>Sin asignar</em>
              </MenuItem>
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name="titulo"
            label="Título"
            fullWidth
            margin="dense"
            value={currentTramite.titulo || ''}
            onChange={handleInputChange}
            required
          />
          <TextField
            name="descripcion"
            label="Descripción"
            fullWidth
            margin="dense"
            multiline
            rows={4}
            value={currentTramite.descripcion || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="estado"
            label="Estado"
            fullWidth
            margin="dense"
            value={currentTramite.estado || ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancelar</Button>
          <Button onClick={handleSaveTramite} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de eliminación */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Eliminar Trámite</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas eliminar "{tramiteToDelete?.titulo}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleDeleteTramite} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}