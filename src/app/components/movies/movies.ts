import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FetchApiMovies } from '../../../utils/fetch.components';
import { CommonModule } from '@angular/common';
import { Pagination } from "../pagination/pagination";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { Search } from "./search/search";
import { MoviesProfile } from '../movies-profile/movies-profile';
import { Router } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    CommonModule,
    Pagination,
    NgxSpinnerModule,
    Search,
    FontAwesomeModule,
],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies implements OnInit {
  
  movies:any[] = [] 
  titleMovies: string = ""
  loadedImages: Set<number> = new Set()
  currentPage = 1;
  totalPages = 0;
  searchQuery: string =""
  category: string ="popular"
  activeCategory: string = ""
  favoriteMovies: any[] = [];
  constructor(
    private movieService: FetchApiMovies,
    private spinner: NgxSpinnerService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private library: FaIconLibrary,

  ) {
    this.movieService = movieService;
    this.spinner= spinner
    this.router=router
    this.cd = cd
    this.library.addIcons(faSolidHeart, faRegularHeart);
    
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getMoviesPopulars();
    this.category
    this.loadFavoriteMovies();
  }

  getMoviesPopulars (page: number = 1, query?: string): void {
    this.movieService.getMoviesApi(`/movie/${this.category}`,page).subscribe((response) => {
      this.movies = response.results;
      this.currentPage = response.page;
      this.totalPages = response.total_pages;
      this.spinner.hide()
      this.cd.detectChanges();
    });
  }
  changeCategory(categotyMovie: string): void {
    this.category = categotyMovie;
    this.activeCategory = categotyMovie;
    this.switchTitle(this.category);
    this.spinner.show();
    this.getMoviesPopulars(1);
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
  favoriteMovie(movieId: number): void {
    const movieIndex = this.favoriteMovies.findIndex(movie => movie.id === movieId);
    
    if (movieIndex > -1) {
      this.favoriteMovies.splice(movieIndex, 1);
    } else {
      const movie = this.movies.find(m => m.id === movieId);
      if (movie) {
        this.favoriteMovies.push(movie);
      }
    }

    this.saveFavoriteMovies();
  }
  isFavorite(movieId: number): boolean {
    return this.favoriteMovies.some(fav => fav.id === movieId);
  }
  loadFavoriteMovies(): void {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    this.favoriteMovies = storedFavorites ? JSON.parse(storedFavorites) : [];
  }
  saveFavoriteMovies(): void {
    localStorage.setItem('favoriteMovies', JSON.stringify(this.favoriteMovies));
  }
  switchTitle(title: string): void {
    switch (title) {
      case 'popular':
        this.titleMovies = 'Películas Populares';
        break;
      case 'top_rated':     
        this.titleMovies = 'Películas Mejor Valoradas';
        break;
      case 'now_playing':
        this.titleMovies = 'Películas en Cartelera';
        break;
      case 'upcoming':
        this.titleMovies = 'Próximamente';
        break;
      default:
        this.titleMovies = 'Películas';
        break;  
    }
  }
}
