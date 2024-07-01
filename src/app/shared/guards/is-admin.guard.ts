import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '@/features/authentication/authentication.service';

export const isAdminGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const user = auth.currentUser;

  if (user) {
    const isAdmin = await authService.checkIsAdmin(user.uid);

    if (!isAdmin) {
      router.navigate(['auth/login']);
    }

    return isAdmin;
  }

  router.navigate(['auth/login']);
  return false;
};
