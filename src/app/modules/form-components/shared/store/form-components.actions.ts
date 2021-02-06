import { createAction, props } from "@ngrx/store";
import { FormComponentsEnum } from "../enums/form-components.enum";

export const changeComponent = createAction(
  '[Product] Load Products',
  props<{ component: FormComponentsEnum }>()
);
