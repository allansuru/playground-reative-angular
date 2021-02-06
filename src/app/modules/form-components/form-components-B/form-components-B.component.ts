import { Component, OnInit, Input } from '@angular/core';
import { FormComponentsService } from '../shared/services/form-components.service';
import { FormComponentsAction } from '../shared/enums/form-components-action';
import { FormComponentsEnum } from '../shared/enums/form-components.enum';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-components-B',
  templateUrl: './form-components-B.component.html',
  styleUrls: ['./form-components-B.component.scss']
})
export class FormComponentsBComponent implements OnInit {

  @Input() form: FormGroup;

  constructor(private formComponentsService: FormComponentsService) { }

  ngOnInit() {
  }

  backHandler() {
    this.formComponentsService.dispatchAction({
      action: FormComponentsAction.CHANGE_COMPONENT,
      data: FormComponentsEnum.COMPONENT_A
    })
  }

  saveHandler() {
    this.formComponentsService.dispatchAction({
      action: FormComponentsAction.SUBMIT_FORM,
      data: this.form.value
    })
  }
}
