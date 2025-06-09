import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const lockGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('auth-token');

  if (!token) {
    return true;
  } else {
    router.navigate(['/dashboard']);
    return false;
  }
};
