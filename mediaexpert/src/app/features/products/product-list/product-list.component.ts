import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListItemComponent } from '../product-list-item/product-list-item.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductListItemComponent, ProductFormComponent, PaginationComponent, TranslateModule],
  providers: [ProductListService],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  public listService = inject(ProductListService);

  ngOnInit(): void {
    this.listService.init();
  }
}
