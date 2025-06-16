import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css'],
})
export class Search {
  @Output() filterMovies = new EventEmitter<string>();

  searchMovies(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input?.value?.trim().toLowerCase() ?? '';
    this.filterMovies.emit(query);
  }
}