import { FormGroup } from '@angular/forms';
import { FormComponentsEnum } from './../shared/enums/form-components.enum';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormComponentsService } from '../shared/services/form-components.service';
import { FormComponentsAction } from '../shared/enums/form-components-action';


@Component({
  selector: 'app-form-components-A',
  templateUrl: './form-components-A.component.html',
  styleUrls: ['./form-components-A.component.scss']
})
export class FormComponentsAComponent implements OnInit {

  @Input() form: FormGroup;

  @ViewChild('campoInputA') campoValorInputA: ElementRef;

  constructor(private formComponentsService: FormComponentsService) { }

  get name() {
    return this.form.get('nameA');
  }

  get description() {
    return this.form.get('descriptionA');
  }

  ngOnInit() {
  }



  nextHandler() {
    console.log(this.campoValorInputA.nativeElement.value);
    this.formComponentsService.dispatchAction({
      action: FormComponentsAction.CHANGE_COMPONENT,
      data: FormComponentsEnum.COMPONENT_B
    })
  }

}
