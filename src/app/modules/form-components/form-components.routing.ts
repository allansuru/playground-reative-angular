import { Routes, RouterModule } from '@angular/router';
import { FormComponentsComponent } from './form-components.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', component: FormComponentsComponent
      }
    ]
  },
];

export const FormComponentsRoutes = RouterModule.forChild(routes);
