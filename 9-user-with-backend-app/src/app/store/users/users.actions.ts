import { createAction, props } from "@ngrx/store";
import { user } from "../../models/user";

export const load = createAction('load', props<{page: number}>());

export const resetUser = createAction('resetUser');
export const findAll = createAction('findAll', props<{users: user[]}>());
export const setPaginator = createAction('setPaginator', props<{paginator: any}>());
export const find = createAction('find', props<{id: number}>());
export const findAllPageable = createAction('findAllPageable', props<{users: user[], paginator: any}>());

export const add = createAction('add', props<{userNew: user}>());
export const addSuccess = createAction('addSuccess', props<{userNew: user}>());
export const update = createAction('update', props<{userUpdated: user}>());
export const updateSuccess = createAction('updateSuccess', props<{userUpdated: user}>());
export const remove = createAction('remove', props<{id: number}>());
export const removeSuccess = createAction('removeSuccess', props<{id: number}>());

export const setErrors = createAction('setErrors', props<{userForm: user, errors: any}>());