import { Routes } from '@angular/router';
import { Movies } from './components/movies/movies';

export const routes: Routes = [
  { path: '', component: Movies },
  {
    path: 'detalle/:id',
    loadComponent: () =>
      import('./components/movies-profile/movies-profile').then(m => m.MoviesProfile)
  },
];