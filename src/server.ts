import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Serve static files
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

// Prerender static routes
const staticRoutes = ['/', '/home', '/products', '/categories', '/brands'];
staticRoutes.forEach((route) => {
  app.get(route, (req, res, next) => {
    angularApp
      .handle(req)
      .then((response) =>
        response ? writeResponseToNodeResponse(response, res) : next()
      )
      .catch(next);
  });
});

// Handle all other requests (catch-all for client-side rendering)
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next()
    )
    .catch(next);
});

// Start server
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Export for Angular CLI dev-server
export const reqHandler = createNodeRequestHandler(app);
