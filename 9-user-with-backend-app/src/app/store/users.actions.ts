import { createAction, props } from "@ngrx/store";
import { user } from "../models/user";

export const findAll = createAction('findAll', props<{users: user[]}>());
export const setPaginator = createAction('setPaginator', props<{paginator: any}>());
export const find = createAction('find', props<{id: number}>());

export const add = createAction('add', props<{userNew: user}>());
export const update = createAction('update', props<{userUpdated: user}>());
export const remove = createAction('remove', props<{id: number}>());