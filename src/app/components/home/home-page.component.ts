import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { MovieService } from '../../services/movie.service';
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @Output() public goToMovieDetailsEvent = new EventEmitter<any>();
  @Output() public goToCategoryMoviesEvent = new EventEmitter<Observable<Category>>();

  public allMovies$: Observable<Category>[] = [];

  constructor (private movieService: MovieService) { }

  ngOnInit () {
    this.prepareMovies();
  }

  public showMovieDetailsPage (movieId: number): void {
    this.goToMovieDetailsEvent.emit({ movieId, category: undefined });
  }

  public showCategoryMoviesPage (category$: Observable<Category>): void {
    this.goToCategoryMoviesEvent.emit(category$);
  }

  private prepareMovies (): void {
    for (const categoryMetadata of this.movieService.getCategoryMetadata()) {
      this.allMovies$.push(this.movieService.getMoviesBaseQuery(categoryMetadata));
    }
  }
}
