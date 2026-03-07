import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessageStrategy } from './error-message.interface';
import { API_ERROR_KEYS } from '../../../shared/constants/error-keys';

export class ApiKeyErrorStrategy implements ErrorMessageStrategy {
  private readonly errorMapping: Record<string, string> = {
    [API_ERROR_KEYS.PRODUCT_CODE_EXISTS]: 'error.PRODUCT_CODE_EXISTS.message',
    [API_ERROR_KEYS.INVALID_PRICE]: 'error.INVALID_PRICE.message',
  };

  canHandle(error: HttpErrorResponse): boolean {
    return error.status === 400 && !!this.errorMapping[error.error?.message];
  }

  getMessageKey(error: HttpErrorResponse): string {
    return this.errorMapping[error.error.message];
  }
}
