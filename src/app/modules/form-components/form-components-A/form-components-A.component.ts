import { FormGroup } from '@angular/forms';
import { FormComponentsEnum } from './../shared/enums/form-components.enum';
import { Component, OnInit, Input } from '@angular/core';
import { FormComponentsService } from '../shared/services/form-components.service';
import { FormComponentsAction } from '../shared/enums/form-components-action';


@Component({
  selector: 'app-form-components-A',
  templateUrl: './form-components-A.component.html',
  styleUrls: ['./form-components-A.component.scss']
})
export class FormComponentsAComponent implements OnInit {

  @Input() form: FormGroup;

  constructor(private formComponentsService: FormComponentsService) { }

  ngOnInit() {
  }

  nextHandler() {
    this.formComponentsService.dispatchAction({
      action: FormComponentsAction.CHANGE_COMPONENT,
      data: FormComponentsEnum.COMPONENT_B
    })
  }

}
