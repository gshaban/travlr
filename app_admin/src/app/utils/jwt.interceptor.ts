import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  const authenticationService = inject(AuthenticationService);
  const isAuthApi = request.url.endsWith('/login') || request.url.endsWith('/register');

  if (authenticationService.isLoggedIn() && !isAuthApi) {
    const token = authenticationService.getToken();
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authRequest);
  }

  return next(request);
};
