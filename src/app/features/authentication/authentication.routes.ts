import { Routes } from '@angular/router';
import { LoginComponent } from '@/features/authentication/branch/login/login.component';
import { LogoutComponent } from '@/features/authentication/branch/logout/logout.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
];
