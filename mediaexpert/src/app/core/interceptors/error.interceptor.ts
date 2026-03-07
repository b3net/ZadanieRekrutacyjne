import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { ErrorHandlerService } from '../services/error-handler.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);
  const translate = inject(TranslateService);
  const errorHandler = inject(ErrorHandlerService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const translationKey = errorHandler.getErrorTranslationKey(error);
      notificationService.show(translate.instant(translationKey), 'danger');

      return throwError(() => error);
    })
  );
};
