import { Component, OnInit } from '@angular/core';
import { FetchApiMovies } from '../../../utils/fetch.components';
import { CommonModule } from '@angular/common';
import { Pagination } from "../pagination/pagination";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { Search } from "./search/search";
import { MoviesProfile } from '../movies-profile/movies-profile';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    CommonModule,
    Pagination,
    NgxSpinnerModule,
    Search,
    MoviesProfile
],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies implements OnInit {
  
  movies:any[] = [] 
  loadedImages: Set<number> = new Set()
  currentPage = 1;
  totalPages = 0;
  searchQuery: string =""
  category: string ="popular"
  activeCategory: string = ""
  constructor(
    private movieService: FetchApiMovies,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.movieService = movieService;
    this.spinner= spinner
    this.router=router
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getMoviesPopulars();
    this.category
    console.log(this.category)

  }

  getMoviesPopulars (page: number = 1, query?: string): void {
    this.movieService.getMoviesApi(`/movie/${this.category}`,page).subscribe((response) => {
      this.movies = response.results;
      this.currentPage = response.page;
      this.totalPages = response.total_pages;
      this.spinner.hide()
    });
  }
  changeCategory (categotyMovie: string) {
    this.category=categotyMovie
    this.activeCategory=categotyMovie
    this.spinner.show();
    this.getMoviesPopulars(1)
  }

  onSearch(query: string): void {
    this.searchQuery = query;
  
    if (query.length > 2) {
      this.spinner.show();
      this.movieService.getMoviesApi('/search/movie', 1, query).subscribe((response) => {
        this.movies = response.results;
        this.currentPage = response.page;
        this.totalPages = response.total_pages;
        this.spinner.hide();
      });
    } else {
      this.getMoviesPopulars(); // si borra el texto, regresa a populares
    }
  }
  onImageLoad(id: number): void {
    this.loadedImages.add(id);
  }

  isImageLoaded(id: number): boolean {
    return this.loadedImages.has(id);
  }

  onPageChange(page: number): void {
    this.spinner.show();
    this.getMoviesPopulars(page);
  }
  verDetalle(movieId: number): void {
    this.router.navigate(['/detalle', movieId]);
  }
}
