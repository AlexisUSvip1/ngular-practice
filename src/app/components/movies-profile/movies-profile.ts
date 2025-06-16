import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchApiMovies } from '../../../utils/fetch.components'; // ajusta si es necesario
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './movies-profile.html',
  styleUrl: './movies-profile.css'
})
export class MoviesProfile implements OnInit {
  movieId: string | null = null;
  movie: any = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: FetchApiMovies
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');

    if (this.movieId) {
      this.getMovieDetails();
    }
  }

  getMovieDetails(): void {
    this.movieService.getMoviesIdi(`/movie/${this.movieId}`).subscribe((data) => {
      this.movie = data;
    });
  }
}