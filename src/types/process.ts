import { User } from './user';
export interface Tramite {
  id: number;
  titulo: string;
  descripcion?: string;
  estado: string;
  fechaCreacion: string;
  usuario: User | null;
  usuario_id?: number | null;  // Campo para la gestión en el frontend
}
