import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @Output() public goToMovieDetailsEvent = new EventEmitter();
  @Output() public goToAllCategoryMoviesEvent = new EventEmitter();

  private popularMovies$: Observable<Movie[]>;
  private inTheaterMovies$: Observable<Movie[]>;
  private popularKidsMovies$: Observable<Movie[]>;
  private topVotedMovies$: Observable<Movie[]>;
  public allMovies$: Observable<Movie[]>[] = [];

  constructor (private movieService: MovieService) { }

  ngOnInit () {
    this.prepareMovies();
    this.allMovies$.push(this.popularMovies$, this.inTheaterMovies$, this.popularKidsMovies$, this.topVotedMovies$);
  }

  public showMovieDetailsPage (movieId: number): void {
    this.goToMovieDetailsEvent.emit(movieId);
  }

  public showAllCategoryMovies (categoryTitle: string): void {
    this.goToAllCategoryMoviesEvent.emit(categoryTitle);
  }

  public search (searchForm: NgForm): void {
    const movieSearch: string = searchForm.value.movie;
    this.showAllCategoryMovies(movieSearch);
  }

  private prepareMovies (): void {
    this.popularMovies$ = this.movieService.getPopularMovies().pipe(
      map((data) => data.slice(0, 6))
    );
    this.inTheaterMovies$ = this.movieService.getInTheaterMovies().pipe(
      map((data) => data.slice(0, 6))
    );
    this.popularKidsMovies$ = this.movieService.getPopularKidsMovies().pipe(
      map((data) => data.slice(0, 6))
    );
    this.topVotedMovies$ = this.movieService.getMostVotedMovies().pipe(
      map((data) => data.slice(0, 6))
    );
  }
}
