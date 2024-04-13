import os from 'os';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { Estudiante,ESTUDIANTES } from './mock-data';

export const t = initTRPC.create();
export const appRouter = t.router({
  
  health: t.procedure.query(() => {
    console.log('Health check');
    return 'ok';
  }),

  getStudents: t.procedure.query(() => {
    console.log('Get students');
    return ESTUDIANTES;
  }),

  getStudentDetails: t.procedure.input(z.number()).query((opts) => {
    const studentId = opts.input;
    const student = ESTUDIANTES.find((s) => s.id === studentId);
    if (!student) throw new Error(`Student with ID ${studentId} not found`);
    console.log('Get student details');
    return student;
  }),

  updateStudentName: t.procedure
    .input(z.object({ id: z.number(), nombre: z.string() }))
    .mutation((opts) => {
      const { id, nombre } = opts.input;
      const studentIndex = ESTUDIANTES.findIndex((s) => s.id === id);
      if (studentIndex === -1) throw new Error(`Student with ID ${id} not found`);
      ESTUDIANTES[studentIndex].nombre = nombre;
      console.log('Update student name');
      return { success: true, message: `Student with ID ${id} updated successfully` };
    }),
});

const port = 8081;
const host = getPrivateIP();
createHTTPServer({
  router: appRouter,
  createContext() {
    console.log('connected');
    return {};
  },
}).listen(port, host);
console.log(`Server is running on http://${host}:${port}`);

function getPrivateIP() {
  const interfaces = os.networkInterfaces();
  for (let iface in interfaces) {
    for (let alias of interfaces[iface] ?? []) {
      if (alias.family === "IPv4" && !alias.internal) {
        return alias.address;
      }
    }
  }
  return "0.0.0.0";
}

// Define el tipo de appRouter
export type AppRouter = typeof appRouter;
