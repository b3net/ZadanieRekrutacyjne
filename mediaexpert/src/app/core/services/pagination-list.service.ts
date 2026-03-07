import { Injectable, signal } from '@angular/core';
import { PagedResult } from '../models/pagination.models';

@Injectable({
  providedIn: 'root'
})
export class PaginationListService<T> {
  items = signal<T[]>([]);
  totalCount = signal<number>(0);
  pageNumber = signal<number>(1);
  pageSize = signal<number>(10);
  totalPages = signal<number>(0);

  setProductsData(data: PagedResult<T>): void {
    this.items.set(data.items);
    this.totalCount.set(data.totalCount);
    this.pageNumber.set(data.pageNumber);
    this.totalPages.set(data.totalPages);
  }

  updatePage(storageKey: string, page: number): void {
    this.pageNumber.set(page);
    sessionStorage.setItem(storageKey, page.toString());
  }

  updatePageSize(storageKey: string, size: number): void {
    this.pageSize.set(size);
    this.pageNumber.set(1);
    sessionStorage.setItem(storageKey, size.toString());
  }

  restoreState(pageKey: string, sizeKey: string): void {
    const savedPage = sessionStorage.getItem(pageKey);
    if (savedPage) {
      this.pageNumber.set(parseInt(savedPage, 10));
    }

    const savedSize = sessionStorage.getItem(sizeKey);
    if (savedSize) {
      this.pageSize.set(parseInt(savedSize, 10));
    }
  }
}
