import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Movie } from '../../shared/models/movie';
import { MovieService } from '../../services/movie.service';
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  @Input() public movieId: number;
  @Input() public category$: Observable<Category>;
  @Output() public emitCategory = new EventEmitter<Observable<Category>>();

  public movie: Movie;
  public imageUrl: string;

  constructor (private movieService: MovieService) { }

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

  public showCategoryMovies (category: Observable<Category>): void {
    this.emitCategory.emit(category);
  }
}
