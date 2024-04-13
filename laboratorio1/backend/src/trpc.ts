import { createTRPCReact } from '@trpc/react-query';
import type { appRouter } from '../src/main';

export const trpc = createTRPCReact<typeof appRouter>();