import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '@/features/authentication/authentication.service';

export const isAdminGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const authService = inject(AuthenticationService);

  const user = auth.currentUser;

  if (user) {
    return await authService.checkIsAdmin(user.uid);
  }

  return false;
};
