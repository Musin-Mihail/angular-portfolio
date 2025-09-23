import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { catchError, throwError } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Inject PLATFORM_ID to check the execution environment
  const platformId = inject(PLATFORM_ID);

  let modifiedReq = req;
  const backendUrl = 'https://dotnet-portfolio-production.up.railway.app';

  if (!req.url.startsWith('https://api.github.com') && !req.url.startsWith(backendUrl)) {
    modifiedReq = req.clone({
      headers: req.headers.set('X-Custom-Auth', 'my-token'),
    });
  }

  return next(modifiedReq).pipe(
    catchError((err: unknown) => {
      if (err instanceof HttpErrorResponse) {
        let errorMessage = 'Произошла неизвестная ошибка';

        if (err.status === 404) {
          errorMessage = 'Запрошенный ресурс не найден (Ошибка 404).';
        } else if (err.status === 500) {
          errorMessage = 'Произошла внутренняя ошибка сервера (Ошибка 500).';
        }
        // Only check for ErrorEvent if running in a browser environment
        else if (isPlatformBrowser(platformId) && err.error instanceof ErrorEvent) {
          errorMessage = `Ошибка на стороне клиента: ${err.error.message}`;
        }

        return throwError(() => new Error(errorMessage));
      }
      return throwError(() => new Error('Произошла непредвиденная ошибка'));
    })
  );
};
