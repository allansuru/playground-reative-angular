import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentCardComponent } from './content-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({

  imports: [
    CommonModule,
    FlexLayoutModule,
    FlexModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  declarations: [ContentCardComponent],
  exports: [ContentCardComponent],

})
export class ContentCardModule { }
