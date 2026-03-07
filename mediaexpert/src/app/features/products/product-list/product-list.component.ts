import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHttpService } from '../../../core/services/http/product.http.service';
import { PaginationListService } from '../../../core/services/pagination-list.service';
import { ProductListItemComponent } from '../product-list-item/product-list-item.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderService } from '../../../core/services/loader.service';
import { ProductViewModel } from '../../../core/models/product.models';
import { STORAGE_KEYS } from '../../../shared/constants/constants';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductListItemComponent, ProductFormComponent, PaginationComponent, TranslateModule],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  private productHttpService = inject(ProductHttpService);
  protected paginationListService = inject(PaginationListService<ProductViewModel>);
  protected loaderService = inject(LoaderService);

  products = signal<ProductViewModel[]>([]);

  ngOnInit(): void {
    this.paginationListService.restoreState(STORAGE_KEYS.PRODUCT_LIST_PAGE, STORAGE_KEYS.PRODUCT_LIST_SIZE);
    this.loadProducts();
  }

  loadProducts(page?: number): void {
    if (page !== undefined) {
      this.paginationListService.updatePage(STORAGE_KEYS.PRODUCT_LIST_PAGE, page);
    }

    this.loaderService.isLoading.set(true);

    this.productHttpService.getProducts(this.paginationListService.pageNumber(), this.paginationListService.pageSize()).subscribe({
      next: (data) => {
        this.paginationListService.setProductsData(data);
        this.loaderService.isLoading.set(false);
      },
      error: (err) => {
        console.error('Błąd pobierania produktów', err);
        this.loaderService.isLoading.set(false);
      }
    });
  }

  onPageSizeChange(size: number): void {
    this.paginationListService.updatePageSize(STORAGE_KEYS.PRODUCT_LIST_SIZE, size);
    this.loadProducts(1);
  }
}
