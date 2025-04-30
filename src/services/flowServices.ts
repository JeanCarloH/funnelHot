

export const createFlow = async (data: any): Promise<{ success: boolean; id: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Datos enviados al backend (mock):', data);
        resolve({ success: true, id: crypto.randomUUID() });
      }, 1000); 
    });
  };
  