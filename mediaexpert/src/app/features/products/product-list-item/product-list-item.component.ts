import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProductViewModel } from '../../../core/models/product.models';
import { MoneyPipe } from '../../../shared/pipes/money.pipe';

@Component({
  selector: 'app-product-list-item',
  standalone: true,
  imports: [MoneyPipe, TranslateModule],
  templateUrl: './product-list-item.component.html'
})
export class ProductListItemComponent {
  @Input({ required: true }) product!: ProductViewModel;
}
