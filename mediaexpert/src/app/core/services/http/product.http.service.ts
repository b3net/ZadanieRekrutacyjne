import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductApiModel, ProductViewModel } from '../../models/product.models';
import { PagedResult } from '../../models/pagination.models';
import { mapToProductViewModel, mapToProductApiModel } from '../../mappers/product.mapper';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Products`;

  getProducts(page: number = 1, pageSize: number = 10): Observable<PagedResult<ProductViewModel>> {
    return this.http.get<PagedResult<ProductApiModel>>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`).pipe(
      map(result => ({
        ...result,
        items: result.items.map(mapToProductViewModel)
      }))
    );
  }

  addProduct(product: Omit<ProductViewModel, 'id'>): Observable<ProductViewModel> {
    const apiModel = mapToProductApiModel(product);
    return this.http.post<ProductApiModel>(this.apiUrl, apiModel).pipe(
      map(mapToProductViewModel)
    );
  }
}
