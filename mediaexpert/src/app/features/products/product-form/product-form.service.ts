import { Injectable, inject, DestroyRef, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductHttpService } from '../../../core/services/http/product.http.service';
import { NotificationService } from '../../../core/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { API_ERROR_KEYS } from '../../../shared/constants/error-keys';
import { tap } from 'rxjs';

@Injectable()
export class ProductFormService {
  private productService = inject(ProductHttpService);
  private notificationService = inject(NotificationService);
  private translate = inject(TranslateService);
  private errorHandler = inject(ErrorHandlerService);
  private destroyRef = inject(DestroyRef);

  form!: FormGroup;
  isSubmitting = signal(false);

  buildForm(): FormGroup {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      price: new FormControl('0.00', [Validators.required, Validators.min(0)])
    });

    this.setupListeners();
    return this.form;
  }

  submit() {
    if (this.form.invalid || this.isSubmitting()) return null;

    this.isSubmitting.set(true);
    const data = this.getSubmitData();

    return this.productService.addProduct(data).pipe(
      tap({
        next: () => {
          this.isSubmitting.set(false);
          this.notificationService.show(
            this.translate.instant('product-form.success', { name: data.name }), 
            'success'
          );
          this.reset();
        },
        error: (err) => {
          this.isSubmitting.set(false);
          if (this.errorHandler.isErrorCode(err, API_ERROR_KEYS.PRODUCT_CODE_EXISTS)) {
            this.form.get('code')?.setErrors({ codeExists: true });
            this.form.get('code')?.markAsTouched();
          }
        }
      })
    );
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  private setupListeners() {
    this.form.get('code')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(v => this.applyTransform('code', this.transformCode(v)));

    this.form.get('price')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(v => this.applyTransform('price', this.transformPrice(v)));
  }

  private transformCode(v: any): string {
    if (!v) return '';
    return String(v).replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  }

  private transformPrice(v: any): string {
    if (!v) return '';
    let cleaned = String(v).replace(/[^0-9.,-]/g, '');
    const parts = cleaned.split(/[.,]/);
    if (parts.length > 2) {
      cleaned = parts[0] + '.' + parts.slice(1).join('');
    }
    return cleaned;
  }

  handleCodeBlur() {
    const control = this.form.get('code');
    if (control?.value) {
      control.setValue(String(control.value).trim().toUpperCase(), { emitEvent: false });
    }
  }

  handlePriceBlur() {
    const control = this.form.get('price');
    const value = control?.value;
    if (value !== null && value !== '') {
      const sanitized = String(value).replace(',', '.');
      const numeric = parseFloat(sanitized);
      if (!isNaN(numeric)) {
        control?.setValue(numeric.toFixed(2), { emitEvent: false });
      }
    }
  }

  private applyTransform(controlName: string, value: string) {
    const control = this.form.get(controlName);
    if (control && control.value !== value) {
      control.setValue(value, { emitEvent: false });
    }
  }

  getSubmitData() {
    const val = this.form.value;
    return {
      code: val.code,
      name: val.name,
      price: Number(String(val.price).replace(',', '.'))
    };
  }

  reset() {
    this.form.reset({
      name: '',
      code: '',
      price: '0.00'
    });
  }
}
