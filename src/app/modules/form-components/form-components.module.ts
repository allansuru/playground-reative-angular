import { ReactiveFormsModule } from '@angular/forms';
import { FormComponentsRoutingModule } from './form-components.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponentsComponent } from './form-components.component';
import { FormComponentsAComponent } from './form-components-A/form-components-A.component';
import { FormComponentsBComponent } from './form-components-B/form-components-B.component';
import { ContentCardModule } from '../../core/content-card/content-card.module';

import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormComponentsEffects } from './shared/store/form-components.effects';

import * as fromFormComponents from './shared/store/form-components.reducer';
import { MatInputModule } from '@angular/material/input';
import { HighlightMouseDirective } from './shared/directives/highlight-mouse.directive';

@NgModule({
  imports: [
    CommonModule,
    ContentCardModule,
    MatCardModule,
    FormComponentsRoutingModule,
    MatButtonModule,
    StoreModule.forFeature(fromFormComponents.FormComponentsFeatureKey, fromFormComponents.reducer),
    EffectsModule.forFeature([FormComponentsEffects]),
    MatInputModule,
    ReactiveFormsModule,

  ],
  declarations: [FormComponentsComponent, FormComponentsAComponent, FormComponentsBComponent, HighlightMouseDirective]
})
export class FormComponentsModule { }
