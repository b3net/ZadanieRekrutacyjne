import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessageStrategy } from './error-message.interface';

export class NotFoundErrorStrategy implements ErrorMessageStrategy {
  canHandle(error: HttpErrorResponse): boolean {
    return error.status === 404;
  }

  getMessageKey(): string {
    return 'error.NOT_FOUND.message';
  }
}
