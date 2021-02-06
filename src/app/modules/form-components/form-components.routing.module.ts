import { Routes, RouterModule } from '@angular/router';
import { FormComponentsComponent } from './form-components.component';
import { NgModule } from '@angular/core';

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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormComponentsRoutingModule { }
