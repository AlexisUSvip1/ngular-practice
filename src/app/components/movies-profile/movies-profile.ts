import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { FetchApiMovies } from '../../../utils/fetch.components';

@Component({
  selector: 'app-movies-profile',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './movies-profile.html',
  styleUrl: './movies-profile.css',
})
export class MoviesProfile implements OnInit {
  movieId: string | null = null;
  movie: any = null;
  favoriteMovies: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: FetchApiMovies,
    private cd: ChangeDetectorRef,
    private library: FaIconLibrary
  ) {
    this.library.addIcons(faSolidHeart, faRegularHeart);
  }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.loadFavoriteMovies();
    if (this.movieId) {
      this.getMovieDetails();
    }
  }

  loadFavoriteMovies(): void {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    this.favoriteMovies = storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  isFavorite(movieId: number): boolean {
    return this.favoriteMovies.some(movie => movie.id === movieId);
  }

  getMovieDetails(): void {
    this.movieService.getMoviesIdi(`/movie/${this.movieId}`).subscribe((data) => {
      this.movie = data;
      this.cd.detectChanges();
    });
  }
}
