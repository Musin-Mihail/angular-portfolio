import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    headers: req.headers.set('X-Custom-Auth', 'my-token'),
  });
  return next(authReq).pipe(
    catchError((err: unknown) => {
      if (err instanceof HttpErrorResponse) {
        let errorMessage = 'Произошла неизвестная ошибка';
        if (err.status === 404) {
          errorMessage = 'Запрошенный ресурс не найден (Ошибка 404).';
        } else if (err.status === 500) {
          errorMessage = 'Произошла внутренняя ошибка сервера (Ошибка 500).';
        } else if (err.error instanceof ErrorEvent) {
          errorMessage = `Ошибка на стороне клиента: ${err.error.message}`;
        }
        return throwError(() => new Error(errorMessage));
      }
      return throwError(() => new Error('Произошла непредвиденная ошибка'));
    })
  );
};
