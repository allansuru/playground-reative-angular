import { FormComponentsAction } from './../enums/form-components-action';
import { ComponentEventHandler } from './../../../../core/abstract-classes/component-event-handler/component-event-handler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormComponentsService extends ComponentEventHandler<FormComponentsAction, any> {

  constructor() {
    super();
  }

}
