import { Routes } from '@angular/router';
import { PageComponent } from './page/page.component';

export const routes: Routes = [
  { path: '', component: PageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
