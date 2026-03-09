import { Injectable, inject } from '@angular/core';
import { PaginationListService } from '../../../core/services/pagination-list.service';
import { LoaderService } from '../../../core/services/loader.service';
import { ProductHttpService } from '../../../core/services/http/product.http.service';
import { ProductViewModel } from '../../../core/models/product.models';
import { STORAGE_KEYS } from '../../../shared/constants/constants';

@Injectable()
export class ProductListService {
  public paginationListService = inject(PaginationListService<ProductViewModel>);
  public loaderService = inject(LoaderService);
  private productHttpService = inject(ProductHttpService);

  init(): void {
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
        this.loaderService.isLoading.set(false);
      }
    });
  }

  onPageSizeChange(size: number): void {
    this.paginationListService.updatePageSize(STORAGE_KEYS.PRODUCT_LIST_SIZE, size);
    this.loadProducts(1);
  }
}