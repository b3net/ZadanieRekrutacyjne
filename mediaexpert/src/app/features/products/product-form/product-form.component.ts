import { Component, inject, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductFormService } from './product-form.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  providers: [ProductFormService],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  public formService = inject(ProductFormService);
  
  @Output() productAdded = new EventEmitter<void>();
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  productForm!: FormGroup;

  ngOnInit() {
    this.productForm = this.formService.buildForm();
  }

  onSubmit() {
    const result$ = this.formService.submit();
    if (result$) {
      result$.subscribe(() => {
        this.productAdded.emit();
        this.nameInput.nativeElement.focus();
      });
    }
  }
}
