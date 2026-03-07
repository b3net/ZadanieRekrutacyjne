import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  pageNumber = input.required<number>();
  totalPages = input.required<number>();
  totalCount = input<number>(0);
  pageSize = input<number>(10);
  
  pageChange = output<number>();
  pageSizeChange = output<number>();

  pageSizeOptions = [10, 20, 50, 100];

  getVisiblePages(): (number | null)[] {
    const total = this.totalPages();
    const current = this.pageNumber();
    const delta = 2;
    
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | null)[] = [];
    
    pages.push(1);

    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    if (left > 2) {
      pages.push(null);
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < total - 1) {
      pages.push(null);
    }

    pages.push(total);

    return pages;
  }
}
