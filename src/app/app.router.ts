import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  { path: '', component: PageComponent },
  { path: '**', component: PageComponent },
];

export const appRouter = RouterModule.forRoot(routes);
