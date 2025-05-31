import { createAction, props } from "@ngrx/store";

export const increment = createAction('[counter component] increment', props<{add: number}>());
export const decrement = createAction('[counter component] decrement');
export const reset = createAction('[counter component] reset');