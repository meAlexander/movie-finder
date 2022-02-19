import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent {
  @Input() public page: number = 1;
  @Input() public category$: Observable<Category>;
  @Output() public goToMovieDetailsEvent = new EventEmitter();
  @Output() public backToHomeEvent = new EventEmitter();

  constructor (private movieService: MovieService) {
  }

  public showMovieDetailsPage (movieId: number): void {
    this.goToMovieDetailsEvent.emit({ movieId, category: this.category$ });
  }

  public showPage (page: number): void {
    this.page = page;
    // this.category$ = this.movieService.getMoviesBaseQuery(page);
  }

  public backToHome (): void {
    this.backToHomeEvent.emit();
  }
}
