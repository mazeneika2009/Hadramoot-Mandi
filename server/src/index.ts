import type { Express } from 'express';
import { createApp } from './createApp';

/**
 * Vercel entrypoint.
 *
 * Vercel wraps the exported Express app in a single serverless function, so
 * this module must not open a listener or run database bootstrapping on
 * import. Use `src/server.ts` for local development and traditional Node
 * hosting.
 */
const app: Express = createApp();

export default app;
