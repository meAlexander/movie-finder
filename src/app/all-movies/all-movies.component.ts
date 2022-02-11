import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';
import { CategoryMovies } from '../const/category-movies';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent implements OnInit {
  @Input() public page: number = 1;
  @Input() public title: string;
  @Output() public emitMovieId = new EventEmitter<number>();
  @Output() public backToHomeEvent = new EventEmitter();

  public movies$: Observable<Movie[]>;
  private searchedQuery: string;

  constructor (public movieService: MovieService) { }

  ngOnInit () {
    this.searchedQuery = this.title;
    this.loadMovies(this.page);
  }

  public showMovieDetailsPage (movieId: number): void {
    this.emitMovieId.emit(movieId);
  }

  public showPage (page: number): void {
    this.page = page;
    this.loadMovies(page);
  }

  public backToHome (): void {
    this.backToHomeEvent.emit();
  }

  private loadMovies (pageNumber: number): void {
    switch (this.title) {
      case CategoryMovies.popularMovies:
        this.movies$ = this.movieService.getPopularMovies(pageNumber);
        break;
      case CategoryMovies.inTheaterMovies:
        this.movies$ = this.movieService.getInTheaterMovies(pageNumber);
        break;
      case CategoryMovies.kidsMovies:
        this.movies$ = this.movieService.getPopularKidsMovies(pageNumber);
        break;
      case CategoryMovies.topRatedMovies:
        this.movies$ = this.movieService.getTopRatedMovies(pageNumber);
        break;
      default:
        this.title = CategoryMovies.searchedMovies;
        this.movies$ = this.movieService.searchMovie(this.searchedQuery, pageNumber);
        break;
    }
  }
}
