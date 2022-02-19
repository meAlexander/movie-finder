import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MovieCategory } from '../constants/movie-category';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent implements OnInit {
  @Input() public page: number = 1;
  @Input() public categoryTitle: string;
  @Output() public emitMovieId = new EventEmitter<number>();
  @Output() public backToHomeEvent = new EventEmitter();

  public category$: Observable<Category>;
  private searchedQuery: string;

  constructor (public movieService: MovieService) { }

  ngOnInit () {
    this.searchedQuery = this.categoryTitle;
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
    switch (this.categoryTitle) {
      case MovieCategory.popularMovies:
        this.category$ = this.movieService.getPopularMovies(pageNumber);
        break;
      case MovieCategory.inTheaterMovies:
        this.category$ = this.movieService.getInTheaterMovies(pageNumber);
        break;
      case MovieCategory.kidsMovies:
        this.category$ = this.movieService.getPopularKidsMovies(pageNumber);
        break;
      case MovieCategory.topRatedMovies:
        this.category$ = this.movieService.getTopRatedMovies(pageNumber);
        break;
      default:
        this.categoryTitle = MovieCategory.searchedMovies;
        this.category$ = this.movieService.searchMovie(this.searchedQuery, pageNumber);
        break;
    }
  }
}
