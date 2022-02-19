import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { MovieService } from '../services/movie.service';
import { Category } from '../models/Category';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @Output() public goToMovieDetailsEvent = new EventEmitter<number>();
  @Output() public goToAllMoviesEvent = new EventEmitter<string>();

  private popularMovies$: Observable<Category>;
  private inTheaterMovies$: Observable<Category>;
  private popularKidsMovies$: Observable<Category>;
  private topRatedMovies$: Observable<Category>;
  public allMovies$: Observable<Category>[] = [];

  constructor (private movieService: MovieService) { }

  ngOnInit () {
    this.prepareMovies();
    this.allMovies$.push(this.popularMovies$, this.inTheaterMovies$, this.popularKidsMovies$, this.topRatedMovies$);
  }

  public showMovieDetailsPage (movieId: number): void {
    this.goToMovieDetailsEvent.emit(movieId);
  }

  public showAllMovies (categoryTitle: string): void {
    this.goToAllMoviesEvent.emit(categoryTitle);
  }

  public search (searchForm: NgForm): void {
    const movieSearch: string = searchForm.value.movie;
    this.showAllMovies(movieSearch);
  }

  private prepareMovies (): void {
    this.popularMovies$ = this.movieService.getPopularMovies()
      .pipe(
        take(1),
        tap(data => data.movies = data.movies.slice(0, 6))
      );
    this.inTheaterMovies$ = this.movieService.getInTheaterMovies()
      .pipe(
        take(1),
        tap(data => data.movies = data.movies.slice(0, 6))
      );
    this.popularKidsMovies$ = this.movieService.getPopularKidsMovies()
      .pipe(
        take(1),
        tap(data => data.movies = data.movies.slice(0, 6))
      );
    this.topRatedMovies$ = this.movieService.getTopRatedMovies()
      .pipe(
        take(1),
        tap(data => data.movies = data.movies.slice(0, 6))
      );
  }
}
