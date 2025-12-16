import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'specific-category/:_id',
    renderMode: RenderMode.Client
  },
  {
    path: 'details/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'brands-detailes/:_id',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
