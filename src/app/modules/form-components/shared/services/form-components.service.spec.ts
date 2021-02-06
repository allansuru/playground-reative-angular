/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormComponentsService } from './form-components.service';

describe('Service: FormComponents', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormComponentsService]
    });
  });

  it('should ...', inject([FormComponentsService], (service: FormComponentsService) => {
    expect(service).toBeTruthy();
  }));
});
