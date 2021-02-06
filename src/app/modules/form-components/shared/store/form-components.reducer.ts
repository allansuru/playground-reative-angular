import { FormComponents } from './../intefaces/form-component';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as FormComponentsActions from './form-components.actions';
import { FormComponentsEnum } from '../enums/form-components.enum';
import { createReducer, Action, on } from '@ngrx/store';

export const FormComponentsFeatureKey = 'form-components';

export interface State extends EntityState<FormComponents> {
  loading: boolean;
  error: any;
  savedOk: boolean;
  component: FormComponentsEnum
}

export const adapter: EntityAdapter<FormComponents> = createEntityAdapter<FormComponents>({});

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null,
  savedOk: false,
  component: FormComponentsEnum.COMPONENT_A
});

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();


const FormComponentsReducer = createReducer(
  initialState,


  on(FormComponentsActions.changeComponent, (state, action) => ({
    ...state,
    ...{ loading: false, component: action.component }
  })),

);


export function reducer(state: State | undefined, action: Action) {
  return FormComponentsReducer(state, action);
}
