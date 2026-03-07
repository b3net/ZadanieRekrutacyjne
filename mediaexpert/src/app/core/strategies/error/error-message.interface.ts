import { HttpErrorResponse } from '@angular/common/http';

export interface ErrorMessageStrategy {
  canHandle(error: HttpErrorResponse): boolean;
  getMessageKey(error: HttpErrorResponse): string;
}
