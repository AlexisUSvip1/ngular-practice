import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
  standalone: true
})
export class Pagination {
   @Input() currentPage = 1
   @Input() totalPages = 0
   @Output() pageChange = new EventEmitter<number>()

   get pages(): number[] {
    return Array.from({ length: Math.min(this.totalPages, 12) }, (_, i) => i + 1);
  }

  selectPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
