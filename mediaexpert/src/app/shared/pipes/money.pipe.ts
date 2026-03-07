import { Pipe, PipeTransform, inject, LOCALE_ID } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'money',
  standalone: true
})
export class MoneyPipe implements PipeTransform {
  private locale = inject(LOCALE_ID);
  private currencyPipe = new CurrencyPipe(this.locale);

  transform(
    value: number | string | null | undefined,
    currencyCode = environment.money.currency,
    display = environment.money.currencyDisplay,
    digitsInfo = environment.money.digitsInfo
  ): string | null {
    return this.currencyPipe.transform(value, currencyCode, display, digitsInfo);
  }
}
