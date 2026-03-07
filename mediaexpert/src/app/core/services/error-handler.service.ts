import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { 
  ErrorMessageStrategy, 
  ApiKeyErrorStrategy, 
  NotFoundErrorStrategy, 
  ServerErrorStrategy, 
  DefaultErrorStrategy 
} from '../strategies/error';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private readonly strategies: ErrorMessageStrategy[] = [
    new ApiKeyErrorStrategy(),
    new NotFoundErrorStrategy(),
    new ServerErrorStrategy(),
    new DefaultErrorStrategy()
  ];

  getErrorTranslationKey(error: HttpErrorResponse): string {
    const strategy = this.strategies.find(s => s.canHandle(error));
    return strategy ? strategy.getMessageKey(error) : 'error.GENERAL.message';
  }

  isErrorCode(error: HttpErrorResponse, code: string): boolean {
    return error.status === 400 && error.error?.message === code;
  }
}
