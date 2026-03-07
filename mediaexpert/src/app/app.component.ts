import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

const DEFAULT_LANGUAGE = 'pl';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductListComponent, NotificationComponent, TranslateModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  protected readonly title = signal('mediaexpert');

  constructor(private translate: TranslateService) {
    this.translate.setFallbackLang(DEFAULT_LANGUAGE);
    this.translate.use(DEFAULT_LANGUAGE);
  }
}
