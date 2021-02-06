import { createAction, props } from "@ngrx/store";
import { FormComponentsEnum } from "../enums/form-components.enum";

export const changeComponent = createAction(
  '[FormComponent] Change Component To Show',
  props<{ component: FormComponentsEnum }>()
);
