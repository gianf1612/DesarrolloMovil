import { z } from 'zod';

export type Estudiante = {
    id: number;
    nombre: string;
    activo: boolean;
    asistencia?: string;
  };
  
  export const ESTUDIANTES = [
    {
      id: 1,
      nombre: "Alejandro Morera Soto",
      activo: false,
      asistencia: "Programación I",
    },
    {
      id: 2,
      nombre: "Jennifer López",
      activo: true,
    },
  ] satisfies Estudiante[];

  export const EstudianteSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    activo: z.boolean(),
    asistencia: z.string().optional(),
  });