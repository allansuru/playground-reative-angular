import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFormComponents from './form-components.reducer';

export const selectFormComponentsState = createFeatureSelector<fromFormComponents.State>(
  fromFormComponents.FormComponentsFeatureKey
);

export const selectEntities = createSelector(selectFormComponentsState, fromFormComponents.selectEntities);

export const selectAllProduct = createSelector(selectFormComponentsState, state => {
  return fromFormComponents.selectAll(state);
});


export const selectProductById = (id: string) =>
  createSelector(selectFormComponentsState, state => state.entities[id]);


export const selectFormComponentsLoading = createSelector(selectFormComponentsState, state => state.loading);
export const selectFormComponentsSavedOk = createSelector(selectFormComponentsState, state => state.savedOk);
export const selectSelectedFormComponents = createSelector(selectFormComponentsState, state => state.component);
