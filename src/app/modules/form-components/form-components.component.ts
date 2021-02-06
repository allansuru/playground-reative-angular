import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormComponentsAction } from './shared/enums/form-components-action';
import { ComponentEvent } from './../../core/abstract-classes/component-event-handler/component-event';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { FormComponentsEnum } from './shared/enums/form-components.enum';
import { FormComponents } from './shared/intefaces/form-component';
import { Store, select } from '@ngrx/store';
import { selectSelectedFormComponents } from './shared/store/form-components.selectors';
import { FormComponentsService } from './shared/services/form-components.service';
import { changeComponent } from './shared/store/form-components.actions';

@Component({
  selector: 'app-form-components',
  templateUrl: './form-components.component.html',
  styleUrls: ['./form-components.component.scss']
})
export class FormComponentsComponent implements OnInit {

  form: FormGroup;

  selectedComponent$: Observable<FormComponentsEnum>;
  loading$: Observable<boolean>;

  private subscription = new Subscription();

  constructor(private formComponentsStore: Store<{ formComponents: FormComponents }>,
    private formComponentsService: FormComponentsService, private formBuilder: FormBuilder) { }


  public get FormComponentsEnum(): typeof FormComponentsEnum {
    return FormComponentsEnum;
  }


  ngOnInit() {
    this.initStore();
    this.initEventListener();
    this.initForm();
  }

  initEventListener() {
    this.subscription.add(
      this.formComponentsService.onEvent
        .subscribe(event => this.childComponentsActionReducer(event))
    )
  }

  private childComponentsActionReducer(event: ComponentEvent<FormComponentsAction, any>) {
    switch (event.action) {
      case FormComponentsAction.CHANGE_COMPONENT:
        this.formComponentsStore.dispatch(changeComponent({ component: event.data }))
        break;

      case FormComponentsAction.SUBMIT_FORM:
        debugger
        break;

      default:
        break;
    }
  }

  private initForm() {
    this.form = this.formBuilder.group({
      nameA: ['', Validators.required],
      descriptionA: ['', Validators.required],
      nameB: ['', Validators.required],
      descriptionB: ['', Validators.required],
    });
  }

  private initStore() {
    this.selectedComponent$ = this.formComponentsStore.pipe(select(selectSelectedFormComponents));
  }



}
