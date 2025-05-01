import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFlowStore } from '@/store/flowStore';
import { createFlow } from '@/services/flowServices';
import swal from 'sweetalert2';
import { FlowData } from '@/types/flow';
export const useFlow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data, setData } = useFlowStore();


  const createNewFlow = async (flowData: FlowData) => {
    setLoading(true);
    setError(null);
    
    try {

      setData(flowData);

      const response = await createFlow(flowData);
      
      if (response.success) {
        swal.fire({
          title: 'Exitoso',
          text: 'Flujo creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        
        
        router.push('/flow/view');
        return response.id;
      } else {
        throw new Error('Error al crear el flujo');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al crear el flujo';
      setError(errorMessage);
      
      swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateFlowSection = (
    sectionId: 'section1' | 'section2' | 'section3',
    field: string,
    value: string
  ) => {
    setData({
      ...data,
      [sectionId]: {
        ...data[sectionId],
        [field]: value,
      },
    });
  };

  const getFormattedNode = (id: string, position: { x: number, y: number }) => {
    switch (id) {
      case '1':
        return {
          id,
          position,
          data: { label: `Título: ${data.section1.title}` },
          type: 'default',
        };
      case '2':
        return {
          id,
          position,
          data: { label: `Contenido: ${data.section2.content}` },
          type: 'default',
        };
      case '3':
        return {
          id,
          position,
          data: { label: `Nota: ${data.section3.note}` },
          type: 'default',
        };
      default:
        return {
          id,
          position,
          data: { label: 'Nodo sin datos' },
          type: 'default',
        };
    }
  };

  return {
    flowData: data,
    loading,
    error,
    createNewFlow,
    updateFlowSection,
    getFormattedNode,
  };
};