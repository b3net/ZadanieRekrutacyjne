import { ErrorMessageStrategy } from './error-message.interface';

export class DefaultErrorStrategy implements ErrorMessageStrategy {
  canHandle(): boolean {
    return true;
  }

  getMessageKey(): string {
    return 'error.GENERAL.message';
  }
}
