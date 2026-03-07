import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessageStrategy } from './error-message.interface';

export class ServerErrorStrategy implements ErrorMessageStrategy {
  canHandle(error: HttpErrorResponse): boolean {
    return error.status >= 500;
  }

  getMessageKey(): string {
    return 'error.INTERNAL_SERVER_ERROR.message';
  }
}
