import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const service = inject(AuthService);
  const router = inject(Router);

  if(service.isAuthenticated()){
    if(isTokenExpired()){
      service.logout();
      router.navigate(['/login']);
      return false;
    }
    if(!service.isAdmin()){
      router.navigate(['/forbidden']);
      return false;
    }
    return true;
  }
  router.navigate(['/login']);
  return false;
};

const isTokenExpired = () => {
  const service = inject(AuthService);
  const token = service.token;
  const payload = service.getpayload(token);
  const expiration = payload.exp;
  const currentTime = new Date().getTime() /1000;

  return (currentTime > expiration) ? true : false;

}
