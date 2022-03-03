import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-movie-details-card',
  templateUrl: './movie-details-card.component.html',
  styleUrls: ['./movie-details-card.component.css']
})
export class MovieDetailsCardComponent implements OnInit {
  @Input() public movieId: number;
  @Input() public category$: Observable<Category>;
  @Output() public emitCategory = new EventEmitter<Observable<Category>>();

  public movie: Movie;
  public imageUrl: string;

  constructor (private movieService: MovieService) {}

  ngOnInit () {
    this.movieService.getMovieDetails(this.movieId)
      .pipe(take(1))
      .subscribe((data: Movie) => {
        this.movie = data;
        this.imageUrl = 'https://image.tmdb.org/t/p/w500/' + this.movie.poster_path;
      });
  }

  public back (): void {
    this.emitCategory.emit(this.category$);
  }

  showCategoryMovies (category: Observable<Category>): void {
    this.emitCategory.emit(category);
  }
}
