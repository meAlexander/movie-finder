import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';
import { AppConst } from '../const/app-const';
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

  ngOnInit (): void {
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
      case AppConst.popularMoviesTitle:
        this.movies$ = this.movieService.getPopularMovies(pageNumber);
        break;
      case AppConst.inTheaterMoviesTitle:
        this.movies$ = this.movieService.getInTheaterMovies(pageNumber);
        break;
      case AppConst.kidsMoviesTitle:
        this.movies$ = this.movieService.getPopularKidsMovies(pageNumber);
        break;
      case AppConst.mostVotedMoviesTitle:
        this.movies$ = this.movieService.getMostVotedMovies(pageNumber);
        break;
      default:
        this.title = AppConst.searchedMoviesTitle;
        this.movies$ = this.movieService.searchMovie(this.searchedQuery, pageNumber);
        break;
    }
  }
}
