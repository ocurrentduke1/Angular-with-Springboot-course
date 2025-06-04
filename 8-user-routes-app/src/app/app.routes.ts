import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
    {path: '', redirectTo: 'users', pathMatch: 'full'},
    {path: 'users', component: UserComponent},
    {path: 'users/Create', component: UserFormComponent},
    {path: 'users/edit/:id', component: UserFormComponent},
];
