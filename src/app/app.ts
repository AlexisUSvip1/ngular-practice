import { Component } from '@angular/core';
import { Movies } from './components/movies/movies';
import { Pagination } from './components/pagination/pagination';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Movies, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class App {
  protected title = 'movies-angular';
}
