import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';
import { ErrorPathComponent } from './error-path/error-path.component';

const routes: Routes = [
  { path: '', component: PageComponent },
  { path: '**', component: ErrorPathComponent },
];

export const appRouter = RouterModule.forRoot(routes);
