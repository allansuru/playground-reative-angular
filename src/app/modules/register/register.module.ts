import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { ContentCardModule } from '../../core/content-card/content-card.module';
import { RegisterUserComponent } from './register-user/register-user.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({

  imports: [
    CommonModule,
    RegisterRoutingModule,
    ContentCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [RegisterUserComponent],
})
export class RegisterModule { }
