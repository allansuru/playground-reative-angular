import { FormComponentsRoutingModule } from './form-components.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponentsComponent } from './form-components.component';
import { FormComponentsAComponent } from './form-components-A/form-components-A.component';
import { FormComponentsBComponent } from './form-components-B/form-components-B.component';
import { ContentCardModule } from '../../core/content-card/content-card.module';

import { MatCardModule } from '@angular/material/card'

@NgModule({
  imports: [
    CommonModule,
    ContentCardModule,
    MatCardModule,
    FormComponentsRoutingModule
  ],
  declarations: [FormComponentsComponent, FormComponentsAComponent, FormComponentsBComponent]
})
export class FormComponentsModule { }
