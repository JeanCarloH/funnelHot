
'use client';

import {
    Tabs,
    Tab,
    Box,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFlow } from '@/services/flowServices';
import { useRouter } from 'next/navigation';
import {useFlowStore} from '@/store/flowStore'; 
import swal from 'sweetalert2';  
const flowSchema = z.object({
    section1: z.object({
        title: z.string().min(1, 'Título requerido'),
        description: z.string().min(1, 'Descripción requerida'),
    }),
    section2: z.object({
        content: z.string().min(1, 'Contenido requerido'),
        media: z.string().url('Debe ser una URL válida'),
    }),
    section3: z.object({
        note: z.string().min(1, 'Nota requerida'),
        link: z.string().url('Debe ser una URL válida'),
    }),
});

type FlowFormData = z.infer<typeof flowSchema>;

const defaultValues: FlowFormData = {
    section1: { title: '', description: '' },
    section2: { content: '', media: '' },
    section3: { note: '', link: '' },
};

export default function CreateFlowForm() {
    const [tabIndex, setTabIndex] = useState(0);
    const router = useRouter();
    const { setData } = useFlowStore();
    const methods = useForm<FlowFormData>({
        resolver: zodResolver(flowSchema),
        defaultValues,
        mode: 'onTouched',
    });

    const { handleSubmit, trigger, register, formState: { errors } } = methods;

    const handleNext = async () => {
        // Definimos el tipo de los campos manualmente para TypeScript
        const sectionFields: ('section1.title' | 'section1.description' | 'section2.content' | 'section2.media' | 'section3.note' | 'section3.link')[][] = [
            ['section1.title', 'section1.description'],
            ['section2.content', 'section2.media'],
            ['section3.note', 'section3.link'],
        ];

        const valid = await trigger(sectionFields[tabIndex] as any);
        if (valid) {
            setTabIndex((prev) => prev + 1);
        }
    }


    const onSubmit = async (data: FlowFormData) => {
        try {
            swal.fire({
                title: 'Exitoso',
                text: 'Creación exitosa',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              });
            setData(data); 
          const response = await createFlow(data);
          if (response.success) {
            // Redirigir a la visualización del flujo con el ID generado
            //router.push(`/flow/${response.id}`);
            router.push('/flow/view');
            console.log("entre")
          }
        } catch (error) {
          console.error('Error creando el flujo:', error);
        }
      };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Tabs value={tabIndex} onChange={(_, newVal) => setTabIndex(newVal)} sx={{ mb: 2, backgroundColor: 'white' }}>
                    <Tab label="Sección 1" />
                    <Tab label="Sección 2" />
                    <Tab label="Sección 3" />
                </Tabs>

                {tabIndex === 0 && (
                    <Box >
                        <TextField fullWidth label="Título" {...methods.register('section1.title')} margin="normal" error={!!errors.section1?.title}
                            helperText={errors.section1?.title?.message} />
                        <TextField fullWidth label="Descripción" {...methods.register('section1.description')} margin="normal" error={!!errors.section1?.description}
                            helperText={errors.section1?.description?.message} />
                    </Box>
                )}

                {tabIndex === 1 && (
                    <Box >
                        <TextField fullWidth label="Contenido" {...methods.register('section2.content')} margin="normal" error={!!errors.section2?.content}
                            helperText={errors.section2?.content?.message} />
                        <TextField fullWidth label="URL de imagen o video" {...methods.register('section2.media')} margin="normal" error={!!errors.section2?.media}
                            helperText={errors.section2?.media?.message} />
                    </Box>
                )}

                {tabIndex === 2 && (
                    <Box >
                        <TextField fullWidth label="Nota" {...methods.register('section3.note')} margin="normal" error={!!errors.section3?.note}
                            helperText={errors.section3?.note?.message} />
                        <TextField fullWidth label="Link (URL)" {...methods.register('section3.link')} margin="normal" error={!!errors.section3?.link}
                            helperText={errors.section3?.link?.message} />
                    </Box>
                )}

                <Box mt={3} display="flex" justifyContent="space-between">
                    {tabIndex < 2 && (
                        <Button variant="outlined" onClick={handleNext}>
                            Siguiente
                        </Button>
                    )}
                    {tabIndex === 2 && (
                        <Button variant="contained" type="submit">
                            Crear
                        </Button>
                    )}
                </Box>
            </form>
        </FormProvider>
    );
}
