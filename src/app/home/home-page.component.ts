import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MovieService } from '../services/movie.service';
import { Category } from '../models/Category';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @Output() public goToMovieDetailsEvent = new EventEmitter();
  @Output() public goToAllMoviesEvent = new EventEmitter<Observable<Category>>();

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
    this.goToMovieDetailsEvent.emit({ movieId, category: undefined});
  }

  public showAllMovies (category$: Observable<Category>): void {
    this.goToAllMoviesEvent.emit(category$);
  }

  public search (searchForm: NgForm): void {
    const movieSearch: string = searchForm.value.movie;
    const searchedMovie$: Observable<Category> = this.movieService.searchMovie(movieSearch);
    this.showAllMovies(searchedMovie$);
  }

  private prepareMovies (): void {
    this.popularMovies$ = this.movieService.getPopularMovies()
      .pipe(take(1));
    this.inTheaterMovies$ = this.movieService.getInTheaterMovies()
      .pipe(take(1));
    this.popularKidsMovies$ = this.movieService.getPopularKidsMovies()
      .pipe(take(1));
    this.topRatedMovies$ = this.movieService.getTopRatedMovies()
      .pipe(take(1));
  }
}
